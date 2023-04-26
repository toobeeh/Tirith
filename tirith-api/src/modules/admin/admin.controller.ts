/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthentificationGuard } from 'src/guards/authentification.guard';
import { PalantirdbService } from 'src/services/palantirdb.service';

@Controller("admin")
@UseGuards(AuthentificationGuard)
export class AdminController {

    constructor(private service: PalantirdbService) { }

    @Get("publicdata")
    publicData() {
        return this.service.database.getPublicData();
    }

    @Get("reports")
    reports() {
        return this.service.database.getReports();
    }

}
