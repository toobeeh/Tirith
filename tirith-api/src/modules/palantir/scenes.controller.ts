/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ScenesService } from 'src/services/scenes.service';
import { SceneDto } from './dto/scenes.dto';

@Controller("scenes")
@ApiTags("scenes")
export class ScenesController {

    constructor(private service: ScenesService) { }

    @Get()
    @ApiResponse({ status: 200, type: SceneDto, isArray: true, description: "An array containing all scenes" })
    async getAllScenes(): Promise<SceneDto[]> {
        return this.service.getAllScenes();
    }
}
