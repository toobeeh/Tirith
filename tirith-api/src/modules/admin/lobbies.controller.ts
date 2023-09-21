/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthRoles, RequiredRole } from 'src/decorators/roles.decorator';
import { AuthentificationGuard } from 'src/guards/authentification.guard';
import { MemberGuard } from 'src/guards/member.guard';
import { PalantirdbService } from 'src/services/palantirdb.service';

@Controller("lobbies")
@RequiredRole(AuthRoles.Admin)
@UseGuards(MemberGuard, AuthentificationGuard)
export class LobbiesController {

    constructor(private service: PalantirdbService) { }

    @Get("publicdata")
    publicData() {
        return this.service.database.getPublicData();
    }

    @Get("reports")
    reports() {
        return this.service.database.getReports();
    }

    @Get()
    lobbies() {
        return this.service.getLobbies();
    }

    @Get(":key/drops")
    lobbyDrops(@Param('key') key: string) {
        return this.service.getLobbyDrops(key);
    }

}
