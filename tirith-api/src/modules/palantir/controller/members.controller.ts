/*
https://docs.nestjs.com/controllers#controllers
*/

import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    Inject,
    Param,
    Patch,
    Query,
    Req,
    Request,
    UseGuards
} from '@nestjs/common';
import {RoleGuard} from 'src/guards/role.guard';
import {UpdateDiscordID} from '../dto/updateDiscord.dto';
import {MemberGuard} from 'src/guards/member.guard';
import {MembershipEnum, RequiredRole, ResourceOwner} from 'src/decorators/roles.decorator';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {AccessTokenDto, MemberDto, MemberFlagDto, MemberWebhookDto} from '../dto/member.dto';
import {MemberSearchDto} from '../dto/memberSearch.dto';
import {ApiSecurityNotes} from 'src/decorators/apiSecurityNote.decorator';
import {LoginTokenParamDto, NumberTokenParamDto, StringIdParamDto} from '../dto/params.dto';
import {IMembersService} from '../../../services/interfaces/members.service.interface';
import {Throttle} from "@nestjs/throttler";
import {getThrottleForDefinition} from "../../../guards/trottleConfigs";
import {IGuildsService} from "../../../services/interfaces/guilds.service.interface";
import {PublicMemberDto} from "../dto/public-member.dto";
import {RequiredScope, TypoScopes} from "../../../decorators/scopes.decorator";

@ApiSecurityNotes()
@RequiredRole(MemberFlagDto.Moderator)
@UseGuards(MemberGuard, RoleGuard)
@Controller("members")
@ApiTags("members")
export class MembersController {

    constructor(
        @Inject(IMembersService) private service: IMembersService,
        @Inject(IGuildsService) private guildService: IGuildsService
    ) { }

    @Get("search")
    @ApiOperation({ summary: "Find members that contain a string" })
    @ApiResponse({ status: 200, type: MemberSearchDto, isArray: true, description: "An array of matching members" })
    async findMembersWildcardSearch(@Query('content') content: string): Promise<MemberSearchDto[]> {
        return this.service.wildcardSearch(content);
    }

    @Get("me")
    @RequiredRole(MembershipEnum.Member)
    @RequiredScope(TypoScopes.memberRead)
    @ApiOperation({ summary: "Get the currently authenticated member" })
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @ApiResponse({ status: 200, type: MemberDto, description: "The authenticated member" })
    async getAuthenticatedMember(@Req() request: Request): Promise<MemberDto> {
        const login = Number(((request as any).user as MemberDto).userLogin);
        return this.service.getByLogin(login);
    }

    @Get(":login")
    @ResourceOwner("login")
    @RequiredRole(MembershipEnum.Member)
    @RequiredScope(TypoScopes.memberRead)
    @ApiOperation({ summary: "Get a member by their login" })
    @ApiResponse({ status: 200, type: MemberDto, description: "The member with specified login" })
    async getMemberByLogin(@Param() params: LoginTokenParamDto): Promise<MemberDto> {
        return this.service.getByLogin(params.login);
    }

    @Get(":login/public")
    @RequiredRole(MembershipEnum.None)
    @ApiOperation({ summary: "Get public info of a member by their login" })
    @ApiResponse({ status: 200, type: PublicMemberDto, description: "The member with specified login" })
    async getPublicMemberInfoByLogin(@Param() params: LoginTokenParamDto): Promise<PublicMemberDto> {
        return this.service.getByLogin(params.login);
    }

    @Get(":login/token")
    @ResourceOwner("login")
    @ApiOperation({ summary: "Get an access token of a member" })
    @ApiResponse({ status: 200, type: AccessTokenDto, description: "The access token of a member with this login" })
    async getMemberAccessToken(@Param() params: LoginTokenParamDto): Promise<AccessTokenDto> {
        return this.service.getAccessToken(params.login);
    }

    @Patch(":login/discord")
    @ApiOperation({ summary: "Update a member's discord ID and merge with other if present" })
    @ApiResponse({ status: 200, type: MemberDto, description: "The updated member" })
    async updateMemberDiscordID(@Param() params: LoginTokenParamDto, @Body() { id }: UpdateDiscordID): Promise<MemberDto> {
        return this.service.updateDiscordID(params.login, id);
    }

    @Delete(":login/dropboost")
    @ApiOperation({ summary: "Delete a dropboost of a member" })
    @ApiResponse({ status: 204 })
    async clearMemberDropboost(@Param() params: LoginTokenParamDto): Promise<void> {
        return this.service.clearDropBoost(params.login);
    }

    @Delete(":login/guilds/:token")
    @ResourceOwner("login")
    @RequiredScope(TypoScopes.guildsWrite)
    @ApiOperation({ summary: "Delete a server from a member's connected guilds" })
    @ApiResponse({ status: 204 })
    async removeConnectedGuild(@Param() params: LoginTokenParamDto, @Param() guildTokenParam: NumberTokenParamDto): Promise<void> {
        return this.service.removeConnectedGuild(params.login, guildTokenParam.token);
    }

    @Patch(":login/guilds/:token")
    @ResourceOwner("login")
    @RequiredScope(TypoScopes.guildsWrite)
    @ApiOperation({ summary: "Connect a user to a guild with given server token" })
    @ApiResponse({ status: 204 })
    async connectMemberToGuild(@Param() params: LoginTokenParamDto, @Param() guildTokenParam: NumberTokenParamDto): Promise<void> {
        const guild = await this.guildService.getGuildByInvite(guildTokenParam.token);
        const allowed = await this.guildService.guildInviteEnabled(guild.GuildID);
        if(!allowed){
            throw new ForbiddenException("Connecting to this guild via invite has been disabled");
        }

        return this.service.connectMemberToGuild(params.login, guildTokenParam.token);
    }

    @Get("discord/:id")
    @ApiOperation({ summary: "Get a member by their discord id" })
    @ApiResponse({ status: 200, type: MemberDto, description: "The member with specified discord id" })
    async getMemberByDiscordID(@Param() params: StringIdParamDto): Promise<MemberDto> {
        return this.service.getByDiscordID(params.id);
    }

    @Get(":login/webhooks")
    @ResourceOwner("login")
    @RequiredScope(TypoScopes.guildsRead, TypoScopes.imagepostRead)
    @ApiOperation({ summary: "Get all webhooks of a member" })
    @ApiResponse({ status: 200, type: MemberWebhookDto, isArray: true, description: "A list of webhooks from all connected guilds" })
    async getMemberGuildWebhooks(@Param() params: LoginTokenParamDto): Promise<MemberWebhookDto[]> {
        const member = await this.service.getByLogin(params.login);
        const webhooks = await Promise.all(member.guilds.map(guild => this.guildService.getGuildWebhooks(guild)));
        return webhooks.flat().map(webhook => ({
            Guild: webhook.Guild,
            Name: webhook.Name
        }));
    }
}
