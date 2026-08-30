/*
https://docs.nestjs.com/controllers#controllers
*/

import {Body, Controller, Get, Inject, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ApiSecurityNotes} from 'src/decorators/apiSecurityNote.decorator';
import {IAdminService} from "../../../services/interfaces/admin.service.interface";
import {RoleGuard} from "../../../guards/role.guard";
import {MemberGuard} from "../../../guards/member.guard";
import {RequiredRole} from "../../../decorators/roles.decorator";
import {MemberFlagDto} from "../dto/member.dto";
import {RequiredScope, TypoScopes} from "../../../decorators/scopes.decorator";
import {DropHistoryDto, DropHistoryParamsDto} from "../dto/dropHistory.dto";
import {IDropsService} from "../../../services/interfaces/drops.service.interface";

@ApiSecurityNotes()
@UseGuards(MemberGuard, RoleGuard)
@Controller("admin")
@ApiTags("admin")
export class AdminController {

    constructor(
        @Inject(IAdminService) private service: IAdminService,
        @Inject(IDropsService) private dropsService: IDropsService,
    ) { }

    @Patch("drop-chunks")
    @RequiredRole(MemberFlagDto.Admin)
    @RequiredScope(TypoScopes.adminWrite)
    @ApiOperation({ summary: "Re-evaluate the drop chunks cache; partitions the open chunk into new subchunks if big enough" })
    reEvaluateDropChunks(): Promise<void> {
        return this.service.reevaluateDropChunks();
    }

    @Post("drop-history")
    @RequiredRole(MemberFlagDto.Moderator)
    @RequiredScope(TypoScopes.adminWrite)
    @ApiOperation({ summary: "Fetch drop history for a given time range and members" })
    @ApiResponse({ status: 200, type: DropHistoryDto, isArray: true, description: "An array of drop history per user" })
    getDropHistory(@Body() params: DropHistoryParamsDto): Promise<DropHistoryDto[]> {
        return this.dropsService.getDropHistory(
            params.logins,
            new Date(Number(params.historyStart)),
            new Date(Number(params.historyEnd))
        );
    }
}
