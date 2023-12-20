/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ScenesService } from 'src/services/scenes.service';
import { SceneDto } from './dto/scenes.dto';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { NumberIdParamDto } from './dto/params.dto';

@ApiSecurityNotes()
@Controller("scenes")
@ApiTags("scenes")
export class ScenesController {

    constructor(private service: ScenesService) { }

    @Get()
    @ApiOperation({ summary: "Get all scenes" })
    @ApiResponse({ status: 200, type: SceneDto, isArray: true, description: "An array containing all scenes" })
    async getAllScenes(): Promise<SceneDto[]> {
        return this.service.getAllScenes();
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a scene by ID" })
    @ApiResponse({ status: 200, type: SceneDto, description: "The scene that matches the given ID" })
    async getSceneById(@Param() params: NumberIdParamDto): Promise<SceneDto> {
        return this.service.getScene(params.id);
    }
}
