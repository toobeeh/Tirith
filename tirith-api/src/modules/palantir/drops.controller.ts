/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequiredRole, AuthRoles } from 'src/decorators/roles.decorator';
import { AuthentificationGuard } from 'src/guards/authentification.guard';
import { MemberGuard } from 'src/guards/member.guard';
import { DropsService } from 'src/services/drops.service';

@Controller("drops")
@ApiTags("drops")
export class DropsController {

    constructor(private service: DropsService) { }

    @Get("next")
    @ApiResponse({ status: 200, type: String, description: "The next drop" })
    @RequiredRole(AuthRoles.Admin)
    @UseGuards(MemberGuard, AuthentificationGuard)
    getNextDrop(): Promise<string> {
        return this.service.getNextDrop();
    }

    @Get("nextbare")
    @ApiResponse({ status: 200, type: String, description: "The next drop" })
    getNextDropbare(): Promise<string> {
        return this.service.getNextDrop();
    }

}
