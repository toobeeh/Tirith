/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SceneDto } from '../dto/scenes.dto';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { NumberIdParamDto } from '../dto/params.dto';
import { IScenesService } from '../service/scenes.service.interface';

@ApiSecurityNotes()
@Controller("scenes")
@ApiTags("scenes")
export class ScenesController {

    constructor(@Inject(IScenesService) private service: IScenesService) { }

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
