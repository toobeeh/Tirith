/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AwardsService } from 'src/services/awards.service';
import { AwardDto } from './dto/awards.dto';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';

@ApiSecurityNotes()
@Controller("awards")
@ApiTags("awards")
export class AwardsController {

    constructor(private service: AwardsService) { }

    @Get()
    @ApiOperation({ summary: "Get all awards" })
    @ApiResponse({ status: 200, type: AwardDto, isArray: true, description: "All available awards" })
    getNextDrop(): Promise<AwardDto[]> {
        return this.service.getAllAwards();
    }
}
