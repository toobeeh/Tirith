/*
https://docs.nestjs.com/controllers#controllers
*/

import {Body, Controller, HttpCode, Inject, Param, Post, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import {ICloudService} from "../../../services/interfaces/cloud.service.interface";
import {CloudImageDto} from "../dto/cloud.dto";
import {CloudSearchDto} from "../dto/cloudSearch.dto";
import {AuthRoles, RequiredRole, ResourceOwner} from "../../../decorators/roles.decorator";
import {LoginTokenParamDto} from "../dto/params.dto";
import {MemberGuard} from "../../../guards/member.guard";
import {RoleGuard} from "../../../guards/role.guard";
import {Throttle} from "@nestjs/throttler";
import {getThrottleForDefinition} from "../../../guards/trottleConfigs";

@ApiSecurityNotes()
@Controller("cloud")
@ApiTags("cloud")
@UseGuards(MemberGuard, RoleGuard)
export class CloudController {

    constructor(@Inject(ICloudService) private service: ICloudService) { }

    @Post(":login/search")
    @HttpCode(200)
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(AuthRoles.Member)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Search for cloud images" })
    @ApiResponse({ status: 200, type: CloudImageDto, isArray: true, description: "All matching images of the current user's cloud" })
    searchUserCloud(@Param() params: LoginTokenParamDto, @Body() filter: CloudSearchDto): Promise<CloudImageDto[]> {
        return this.service.searchDrawings(params.login, filter);
    }
}
