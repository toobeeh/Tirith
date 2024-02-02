/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { GuildInviteDto } from '../dto/guilds.dto';
import { NumberTokenParamDto } from '../dto/params.dto';
import { IGuildsService } from '../../../services/interfaces/guilds.service.interface';

@ApiSecurityNotes()
@Controller("guilds")
@ApiTags("guilds")
export class GuildsController {

    constructor(@Inject(IGuildsService) private service: IGuildsService) { }

    @Get(":token/invite")
    @ApiOperation({ summary: "Get invite information of a guild" })
    @ApiResponse({ status: 200, type: GuildInviteDto, description: "The invite information of a guild" })
    async getGuildInvite(@Param() params: NumberTokenParamDto): Promise<GuildInviteDto> {
        return this.service.getGuildPreview(params.token);
    }
}
