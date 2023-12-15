/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
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

    @Get(":id")
    @ApiResponse({ status: 200, type: SceneDto, description: "The scene that matches the given ID" })
    async getSceneById(@Param('id') id: number): Promise<SceneDto> {
        return this.service.getScene(id);
    }
}
