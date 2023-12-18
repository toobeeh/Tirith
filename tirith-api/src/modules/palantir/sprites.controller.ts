/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpritesService } from 'src/services/sprites.service';
import { SpriteDto } from './dto/sprites.dto';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';

@ApiSecurityNotes()
@Controller("sprites")
@ApiTags("sprites")
export class SpritesController {

    constructor(private service: SpritesService) { }

    @Get()
    @ApiOperation({ summary: "Get all sprites" })
    @ApiResponse({ status: 200, type: SpriteDto, isArray: true, description: "An array containing all sprites" })
    async getAllSprites(): Promise<SpriteDto[]> {
        return this.service.getAllSprites();
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a sprite by ID" })
    @ApiResponse({ status: 200, type: SpriteDto, description: "The sprite that matches the given ID" })
    async getSpriteById(@Param('id') id: number): Promise<SpriteDto> {
        return this.service.getSprites(id);
    }
}
