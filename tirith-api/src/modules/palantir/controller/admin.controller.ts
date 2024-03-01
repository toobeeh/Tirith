/*
https://docs.nestjs.com/controllers#controllers
*/

import {Controller, Get, Inject, Patch} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AwardDto } from '../dto/awards.dto';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { IAwardsService } from '../../../services/interfaces/awards.service.interface';
import {IAdminService} from "../../../services/interfaces/admin.service.interface";

@ApiSecurityNotes()
@Controller("admin")
@ApiTags("admin")
export class AdminController {

    constructor(@Inject(IAdminService) private service: IAdminService) { }

    @Patch()
    @ApiOperation({ summary: "Re-evaluate the drop chunks cache; partitions the open chunk into new subchunks if big enough" })
    getNextDrop(): Promise<void> {
        return this.service.reevaluateDropChunks();
    }
}
