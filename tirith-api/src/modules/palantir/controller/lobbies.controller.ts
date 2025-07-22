/*
https://docs.nestjs.com/controllers#controllers
*/

import {Controller, Get, Inject, Param, Req, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import {MembershipEnum, RequiredRole} from 'src/decorators/roles.decorator';
import {RoleGuard} from 'src/guards/role.guard';
import {MemberGuard} from 'src/guards/member.guard';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { OnlineLobbyDto} from '../dto/lobbies.dto';
import {DropDto} from '../dto/drops.dto';
import {ApiSecurityNotes} from 'src/decorators/apiSecurityNote.decorator';
import {StringTokenParamDto} from '../dto/params.dto';
import {Throttle} from '@nestjs/throttler';
import {getThrottleForDefinition} from 'src/guards/trottleConfigs';
import {ILobbiesService} from '../../../services/interfaces/lobbies.service.interface';
import {MemberDto, MemberFlagDto} from "../dto/member.dto";
import {LobbyLinkDto} from "../dto/lobbyLink.dto";
import {RequiredScope, TypoScopes} from "../../../decorators/scopes.decorator";

const scopeGuildsRead = "member.guilds:read";

@ApiSecurityNotes()
@Controller("lobbies")
@ApiTags("lobbies")
@RequiredRole(MemberFlagDto.Moderator)
@UseGuards(MemberGuard, RoleGuard)
@ApiBearerAuth()
export class LobbiesController {

    constructor(
        @Inject(ILobbiesService) private service: ILobbiesService
    ) { }

    @Get()
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredScope(TypoScopes.adminWrite)
    @ApiOperation({ summary: "Get all current lobbies" })
    @ApiResponse({ status: 200, type: OnlineLobbyDto, isArray: true, description: "An array of all current lobbies" })
    getAllLobbies(): Promise<OnlineLobbyDto[]> {
        return this.service.getAllLobbies();
    }

    @Get(":token/drops")
    @RequiredScope(TypoScopes.adminWrite)
    @ApiOperation({ summary: "Get all drops caught in a lobby" })
    @ApiResponse({ status: 200, type: DropDto, isArray: true, description: "An array of all drops caught in a lobby" })
    getLobbyDrops(@Param() params: StringTokenParamDto): Promise<DropDto[]> {
        return this.service.getLobbyDrops(params.token);
    }

    @Get("join/:token")
    @RequiredRole(MembershipEnum.Member)
    @RequiredScope(TypoScopes.guildsRead)
    @ApiOperation({ summary: "Redirect to a lobby" })
    @ApiResponse({ status: 200, type: LobbyLinkDto, description: "The decrypted signed token containing the link" })
    async getDecryptedLobbyLink(@Req() request: Request, @Param() params: StringTokenParamDto): Promise<LobbyLinkDto> {
        const member = (request as any).user as MemberDto;
        const link = await this.service.decryptLobbyLinkToken(params.token);
        if(!member.guilds.some(g => g.GuildID === link.guildId.toString())) {
            throw new UnauthorizedException("Member is not connected to origin guild");
        }

        return { link: link.link };
    }

}
