/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post, Response as Res } from '@nestjs/common';
import { PalantirdbService } from 'src/services/palantirdb.service';
import { Response } from 'express';

@Controller("auth")
export class AuthController {
    constructor(private service: PalantirdbService) { }

    @Get("token")
    token(@Res() res: Response) {
        console.log(res.locals.user);
        return this.service.database.getPublicData();
    }

    @Post("register")
    register() {
        return this.service.database.getPublicData();
    }
}
