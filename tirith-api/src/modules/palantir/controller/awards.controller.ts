/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AwardDto } from '../dto/awards.dto';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { IAwardsService } from '../services/awards.service.interface';

@ApiSecurityNotes()
@Controller("awards")
@ApiTags("awards")
export class AwardsController {

    constructor(@Inject(IAwardsService) private service: IAwardsService) { }

    @Get()
    @ApiOperation({ summary: "Get all awards" })
    @ApiResponse({ status: 200, type: AwardDto, isArray: true, description: "All available awards" })
    getNextDrop(): Promise<AwardDto[]> {
        return this.service.getAllAwards();
    }
}
