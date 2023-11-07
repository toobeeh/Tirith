/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AwardsService } from 'src/services/awards.service';
import { AwardDto } from './dto/awards.dto';

@Controller("awards")
@ApiTags("awards")
export class AwardsController {

    constructor(private service: AwardsService) { }

    @Get()
    @ApiResponse({ status: 200, type: AwardDto, isArray: true, description: "All available awards" })
    getNextDrop(): Promise<AwardDto[]> {
        return this.service.getAllAwards();
    }
}
