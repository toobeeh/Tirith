/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthRoles, RequiredRole } from 'src/decorators/roles.decorator';
import { AuthentificationGuard } from 'src/guards/authentification.guard';
import { MemberGuard } from 'src/guards/member.guard';
import { LobbiesService } from 'src/services/lobbies.service';
import { ReportsResponseDto } from './dto/reports.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LobbiesResponseDto } from './dto/lobbies.dto';
import { DropDto } from './dto/drops.dto';

@Controller("lobbies")
@ApiTags("lobbies")
@RequiredRole(AuthRoles.Admin)
@UseGuards(MemberGuard, AuthentificationGuard)
export class LobbiesController {

    constructor(private service: LobbiesService) { }

    @Get("reports")
    @ApiResponse({ status: 200, type: ReportsResponseDto, isArray: true, description: "An array of all current reports" })
    getAllReports(): Promise<ReportsResponseDto[]> {
        return this.service.getLobbyReports();
    }

    @Get()
    @ApiResponse({ status: 200, type: LobbiesResponseDto, isArray: true, description: "An array of all current lobbies" })
    getAllLobbies(): Promise<LobbiesResponseDto[]> {
        return this.service.getLobbies();
    }

    @Get(":key/drops")
    @ApiResponse({ status: 200, type: DropDto, isArray: true, description: "An array of all drops caught in a lobby" })
    getLobbyDrops(@Param('key') key: string): Promise<DropDto[]> {
        return this.service.getLobbyDrops(key);
    }

}
