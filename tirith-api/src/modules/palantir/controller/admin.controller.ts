/*
https://docs.nestjs.com/controllers#controllers
*/

import {Controller, Inject, Patch, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {ApiSecurityNotes} from 'src/decorators/apiSecurityNote.decorator';
import {IAdminService} from "../../../services/interfaces/admin.service.interface";
import {RoleGuard} from "../../../guards/role.guard";
import {MemberGuard} from "../../../guards/member.guard";
import {RequiredRole} from "../../../decorators/roles.decorator";
import {MemberFlagDto} from "../dto/member.dto";
import {RequiredScope, TypoScopes} from "../../../decorators/scopes.decorator";

@ApiSecurityNotes()
@UseGuards(MemberGuard, RoleGuard)
@RequiredRole(MemberFlagDto.Admin)
@Controller("admin")
@ApiTags("admin")
export class AdminController {

    constructor(@Inject(IAdminService) private service: IAdminService) { }

    @Patch()
    @RequiredScope(TypoScopes.adminWrite)
    @ApiOperation({ summary: "Re-evaluate the drop chunks cache; partitions the open chunk into new subchunks if big enough" })
    getNextDrop(): Promise<void> {
        return this.service.reevaluateDropChunks();
    }
}
