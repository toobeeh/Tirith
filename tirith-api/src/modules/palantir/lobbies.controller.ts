/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthRoles, RequiredRole } from 'src/decorators/roles.decorator';
import { AuthentificationGuard } from 'src/guards/authentification.guard';
import { MemberGuard } from 'src/guards/member.guard';
import { LobbiesService } from 'src/services/lobbies.service';
import { ReportsResponseDto } from './dto/reports.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LobbiesResponseDto } from './dto/lobbies.dto';
import { DropDto } from './dto/drops.dto';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';

@ApiSecurityNotes()
@Controller("lobbies")
@ApiTags("lobbies")
@RequiredRole(AuthRoles.Moderator)
@UseGuards(MemberGuard, AuthentificationGuard)
@ApiBearerAuth()
export class LobbiesController {

    constructor(private service: LobbiesService) { }

    @Get("reports")
    @ApiOperation({ summary: "Get all logged lobby reports" })
    @ApiResponse({ status: 200, type: ReportsResponseDto, isArray: true, description: "An array of all current reports" })
    getAllReports(): Promise<ReportsResponseDto[]> {
        return this.service.getLobbyReports();
    }

    /* @Get("grouped")
    @ApiResponse({ status: 200, type: ReportsResponseDto, isArray: true, description: "An array of all current lobbies grouped by target guild" })
    getGuildLobbies(): Promise<ReportsResponseDto[]> {
        return this.service.getGuildLobbies();
    } */

    @Get()
    @ApiOperation({ summary: "Get all present lobbies" })
    @ApiResponse({ status: 200, type: LobbiesResponseDto, isArray: true, description: "An array of all current lobbies" })
    inspectAllLobbies(): Promise<LobbiesResponseDto[]> {
        return this.service.inspectLobbies();
    }

    @Get(":key/drops")
    @ApiOperation({ summary: "Get all drops caught in a lobby" })
    @ApiResponse({ status: 200, type: DropDto, isArray: true, description: "An array of all drops caught in a lobby" })
    getLobbyDrops(@Param('key') key: string): Promise<DropDto[]> {
        return this.service.getLobbyDrops(key);
    }

}
