/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { RequiredRole, AuthRoles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { MemberGuard } from 'src/guards/member.guard';
import { DropsService } from 'src/modules/palantir/service/drops.service';

@ApiSecurityNotes()
@RequiredRole(AuthRoles.Administrator)
@UseGuards(MemberGuard, RoleGuard)
@Controller("drops")
@ApiTags("drops")
export class DropsController {

    constructor(private service: DropsService) { }

    @Get("next")
    @ApiOperation({ summary: "Get the next drop ID" })
    @ApiResponse({ status: 200, type: String, description: "The next drop" })
    getNextDrop(): Promise<number> {
        return this.service.getNextDrop();
    }

}
