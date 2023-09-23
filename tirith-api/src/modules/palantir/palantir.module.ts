import { AuthentificationService } from 'src/services/authentification.service';
import { LobbiesController } from './lobbies.controller';
/*
https://docs.nestjs.com/modules
*/

import { PalantirdbService } from 'src/services/palantirdb.service';
import { MembersController } from './members.controller';
import { Module } from '@nestjs/common';
import { LobbiesService } from 'src/services/lobbies.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseReshapeInterceptor } from 'src/interceptors/responsereshape.interceptor';
import { MembersService } from 'src/services/members.service';
import { DropsController } from './drops.controller';
import { DropsService } from 'src/services/drops.service';

@Module({
    imports: [],
    controllers: [
        LobbiesController,
        MembersController,
        DropsController
    ],
    providers: [AuthentificationService, DropsService, LobbiesService, MembersService, PalantirdbService, {
        provide: APP_INTERCEPTOR,
        useClass: ResponseReshapeInterceptor,
    },],
})
export class PalantirModule { }
