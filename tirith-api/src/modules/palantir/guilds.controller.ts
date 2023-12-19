/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { GuildsService } from 'src/services/guilds.service';
import { GuildInviteDto } from './dto/guilds.dto';

@ApiSecurityNotes()
@Controller("guilds")
@ApiTags("guilds")
export class GuildsController {

    constructor(private service: GuildsService) { }

    @Get(":token/invite")
    @ApiOperation({ summary: "Get invite information of a guild" })
    @ApiResponse({ status: 200, type: GuildInviteDto, description: "The invite information of a guild" })
    async getGuildInvite(@Param('token') token: number): Promise<GuildInviteDto> {
        return this.service.getGuildPreview(token);
    }
}
