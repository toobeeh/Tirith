/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller("sprites")
@ApiTags("sprites")
export class SpritesController {

    @Get()
    getHello(): string {
        return "Hello theres";
    }
}
