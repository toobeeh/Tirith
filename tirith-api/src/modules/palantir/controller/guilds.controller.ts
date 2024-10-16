/*
https://docs.nestjs.com/controllers#controllers
*/

import {
    Body,
    Controller,
    Get,
    HttpCode,
    Inject,
    NotFoundException,
    Param,
    Post,
    Req,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ApiSecurityNotes} from 'src/decorators/apiSecurityNote.decorator';
import {GuildInviteDto} from '../dto/guilds.dto';
import {NumberTokenParamDto, StringIdParamDto} from '../dto/params.dto';
import {IGuildsService} from '../../../services/interfaces/guilds.service.interface';
import {Throttle} from "@nestjs/throttler";
import {getThrottleForDefinition} from "../../../guards/trottleConfigs";
import {MembershipEnum, RequiredRole} from "../../../decorators/roles.decorator";
import {MemberDto} from "../dto/member.dto";
import {PostImageDto} from "../dto/postWebhook.dto";
import {DiscordApiService} from "../../../services/discord-api.service";
import {MemberGuard} from "../../../guards/member.guard";
import {RoleGuard} from "../../../guards/role.guard";
import {map} from "rxjs";

@ApiSecurityNotes()
@Controller("guilds")
@ApiTags("guilds")
export class GuildsController {

    constructor(
        @Inject(IGuildsService) private guildsService: IGuildsService,
        private discordService: DiscordApiService
    ) { }

    @Get(":token/invite")
    @ApiOperation({ summary: "Get invite information of a guild" })
    @ApiResponse({ status: 200, type: GuildInviteDto, description: "The invite information of a guild" })
    async getGuildInvite(@Param() params: NumberTokenParamDto): Promise<GuildInviteDto> {
        return this.guildsService.getGuildPreview(params.token);
    }

    @Post(":token/imagepost/:id")
    @HttpCode(200)
    @Throttle(getThrottleForDefinition("throttleTenPerTenMinutes"))
    @UseGuards(MemberGuard, RoleGuard)
    @RequiredRole(MembershipEnum.Member)
    @ApiOperation({ summary: "Post an image to a guild channel" })
    @ApiResponse({ status: 200, description: "The image has been posted to the guild"})
    async postImageToGuild(@Req() request, @Param() guildTokenParams: NumberTokenParamDto, @Param() webhookNameParams: StringIdParamDto, @Body() webhookData: PostImageDto) {
        const member = (request as any).user as MemberDto;
        const guild = member.guilds.find(guild => guild.Invite == guildTokenParams.token);
        if(guild === undefined) {
            throw new UnauthorizedException("Member is not part of the guild");
        }

        const webhooks = await this.guildsService.getGuildWebhooks(guild);

        const webhook = webhooks.find(hook => hook.Name === webhookNameParams.id);
        if(webhook === undefined) {
            throw new NotFoundException("Webhook not found");
        }

        return this.discordService.postWebhook(
            member.userName,
            webhookData.onlyImage,
            webhookData.author,
            webhookData.posterName,
            webhookData.title,
            webhookData.imageBase64,
            webhook.URL
        ).pipe(map(() => undefined));
    }
}
