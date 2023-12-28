import { AuthentificationService } from 'src/services/authentification.service';
import { LobbiesController } from './controller/lobbies.controller';
/*
https://docs.nestjs.com/modules
*/

import { PalantirdbService } from 'src/services/palantirdb.service';
import { MembersController } from './controller/members.controller';
import { Module } from '@nestjs/common';
import { LobbiesService } from 'src/modules/palantir/service/lobbies.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseReshapeInterceptor } from 'src/interceptors/responsereshape.interceptor';
import { MembersService } from 'src/modules/palantir/service/members.service';
import { DropsController } from './controller/drops.controller';
import { DropsService } from 'src/modules/palantir/service/drops.service';
import { AwardsController } from './controller/awards.controller';
import { ScenesController } from './controller/scenes.controller';
import { SpritesController } from './controller/sprites.controller';
import { EventsController } from './controller/events.controller';
import { DiscordApiService } from 'src/services/discord-api.service';
import { HttpModule } from '@nestjs/axios';
import { GuildsController } from './controller/guilds.controller';
import { GuildsService } from 'src/modules/palantir/service/guilds.service';
import { ThemesController } from './controller/themes.controller';
import { GrpcModule } from '../grpc/grpc.module';

@Module({
    imports: [
        HttpModule,
        GrpcModule
    ],
    controllers: [
        LobbiesController,
        MembersController,
        DropsController,
        AwardsController,
        ScenesController,
        SpritesController,
        EventsController,
        GuildsController,
        ThemesController
    ],
    providers: [
        AuthentificationService,
        LobbiesService,
        MembersService,
        PalantirdbService,
        DropsService,
        DiscordApiService,
        GuildsService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseReshapeInterceptor,
        },
    ],
})
export class PalantirModule { }
