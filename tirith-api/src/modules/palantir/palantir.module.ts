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
import { AwardsController } from './awards.controller';
import { AwardsService } from 'src/services/awards.service';
import { ScenesController } from './scenes.controller';
import { SpritesController } from './sprites.controller';
import { SpritesService } from 'src/services/sprites.service';
import { ScenesService } from 'src/services/scenes.service';
import { EventsService } from 'src/services/events.service';
import { EventsController } from './events.controller';

@Module({
    imports: [],
    controllers: [
        LobbiesController,
        MembersController,
        DropsController,
        AwardsController,
        ScenesController,
        SpritesController,
        EventsController
    ],
    providers: [
        AuthentificationService,
        DropsService,
        LobbiesService,
        MembersService,
        PalantirdbService,
        AwardsService,
        EventsService,
        SpritesService,
        ScenesService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseReshapeInterceptor,
        },
    ],
})
export class PalantirModule { }