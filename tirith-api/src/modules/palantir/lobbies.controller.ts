/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthRoles, RequiredRole } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { MemberGuard } from 'src/guards/member.guard';
import { LobbiesService } from 'src/services/lobbies.service';
import { ReportsResponseDto } from './dto/reports.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LobbiesResponseDto } from './dto/lobbies.dto';
import { DropDto } from './dto/drops.dto';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { StringTokenParamDto } from './dto/params.dto';
import { Throttle } from '@nestjs/throttler';
import { getThrottleForDefinition } from 'src/guards/trottleConfigs';

@ApiSecurityNotes()
@Controller("lobbies")
@ApiTags("lobbies")
@RequiredRole(AuthRoles.Moderator)
@UseGuards(MemberGuard, RoleGuard)
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
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @ApiOperation({ summary: "Get all present lobbies" })
    @ApiResponse({ status: 200, type: LobbiesResponseDto, isArray: true, description: "An array of all current lobbies" })
    inspectAllLobbies(): Promise<LobbiesResponseDto[]> {
        return this.service.inspectLobbies();
    }

    @Get(":token/drops")
    @ApiOperation({ summary: "Get all drops caught in a lobby" })
    @ApiResponse({ status: 200, type: DropDto, isArray: true, description: "An array of all drops caught in a lobby" })
    getLobbyDrops(@Param() params: StringTokenParamDto): Promise<DropDto[]> {
        return this.service.getLobbyDrops(params.token);
    }

}
