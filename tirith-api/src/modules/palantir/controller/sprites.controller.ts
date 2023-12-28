/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpriteDto } from '../dto/sprites.dto';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { NumberIdParamDto } from '../dto/params.dto';
import { ISpritesService } from '../service/sprites.service.interface';

@ApiSecurityNotes()
@Controller("sprites")
@ApiTags("sprites")
export class SpritesController {

    constructor(@Inject(ISpritesService) private service: ISpritesService) { }

    @Get()
    @ApiOperation({ summary: "Get all sprites" })
    @ApiResponse({ status: 200, type: SpriteDto, isArray: true, description: "An array containing all sprites" })
    async getAllSprites(): Promise<SpriteDto[]> {
        return this.service.getAllSprites();
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a sprite by ID" })
    @ApiResponse({ status: 200, type: SpriteDto, description: "The sprite that matches the given ID" })
    async getSpriteById(@Param() params: NumberIdParamDto): Promise<SpriteDto> {
        return this.service.getSprite(params.id);
    }
}
