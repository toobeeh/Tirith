/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Patch, Query, Req, UseGuards, Request, Inject } from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';
import { UpdateDiscordID } from '../dto/updateDiscord.dto';
import { MemberGuard } from 'src/guards/member.guard';
import { AuthRoles, RequiredRole, ResourceOwner } from 'src/decorators/roles.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenDto, MemberDto } from '../dto/member.dto';
import { MemberSearchDto } from '../dto/memberSearch.dto';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import {LoginTokenParamDto, NumberTokenParamDto, StringIdParamDto, StringTokenParamDto} from '../dto/params.dto';
import { IMembersService } from '../../../services/interfaces/members.service.interface';

@ApiSecurityNotes()
@RequiredRole(AuthRoles.Moderator)
@UseGuards(MemberGuard, RoleGuard)
@Controller("members")
@ApiTags("members")
export class MembersController {

    constructor(@Inject(IMembersService) private service: IMembersService) { }

    @Get("search")
    @ApiOperation({ summary: "Find members that contain a string" })
    @ApiResponse({ status: 200, type: MemberSearchDto, isArray: true, description: "An array of matching members" })
    async findMembersWildcardSearch(@Query('content') content: string): Promise<MemberSearchDto[]> {
        return this.service.wildcardSearch(content);
    }

    @Get("me")
    @RequiredRole(AuthRoles.Member)
    @ApiOperation({ summary: "Get the currently authenticated member" })
    @ApiResponse({ status: 200, type: MemberDto, description: "The authenticated member" })
    async getAuthenticatedMember(@Req() request: Request): Promise<MemberDto> {
        const login = Number(((request as any).user as MemberDto).userLogin);
        return this.service.getByLogin(login);
    }

    @Get(":login")
    @ResourceOwner("login")
    @ApiOperation({ summary: "Get a member by their login" })
    @ApiResponse({ status: 200, type: MemberDto, description: "The member with specified login" })
    async getMemberByLogin(@Param() params: LoginTokenParamDto): Promise<MemberDto> {
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
    @ApiOperation({ summary: "Delete a server from a member's connected guilds" })
    @ApiResponse({ status: 204 })
    async removeConnectedGuild(@Param() params: LoginTokenParamDto, @Param() guildTokenParam: NumberTokenParamDto): Promise<void> {
        return this.service.removeConnectedGuild(params.login, guildTokenParam.token);
    }

    @Patch(":login/guilds/:token")
    @ResourceOwner("login")
    @ApiOperation({ summary: "Connect a user to a guild with given server token" })
    @ApiResponse({ status: 204 })
    async connectMemberToGuild(@Param() params: LoginTokenParamDto, @Param() guildTokenParam: NumberTokenParamDto): Promise<void> {
        return this.service.connectMemberToGuild(params.login, guildTokenParam.token);
    }

    @Get("discord/:id")
    @ApiOperation({ summary: "Get a member by their discord id" })
    @ApiResponse({ status: 200, type: MemberDto, description: "The member with specified discord id" })
    async getMemberByDiscordID(@Param() params: StringIdParamDto): Promise<MemberDto> {
        return this.service.getByDiscordID(params.id);
    }
}
