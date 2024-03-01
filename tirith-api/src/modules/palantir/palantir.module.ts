import { AuthentificationService } from 'src/services/authentification.service';
import { LobbiesController } from './controller/lobbies.controller';
/*
https://docs.nestjs.com/modules
*/

import { MembersController } from './controller/members.controller';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseReshapeInterceptor } from 'src/interceptors/responsereshape.interceptor';
import { AwardsController } from './controller/awards.controller';
import { ScenesController } from './controller/scenes.controller';
import { SpritesController } from './controller/sprites.controller';
import { EventsController } from './controller/events.controller';
import { DiscordApiService } from 'src/services/discord-api.service';
import { HttpModule } from '@nestjs/axios';
import { GuildsController } from './controller/guilds.controller';
import { ThemesController } from './controller/themes.controller';
import { GrpcModule } from '../grpc/grpc.module';
import {AdminController} from "./controller/admin.controller";
import {LeaguesController} from "./controller/leagues.controller";

@Module({
    imports: [
        HttpModule,
        GrpcModule
    ],
    controllers: [
        LobbiesController,
        MembersController,
        AwardsController,
        ScenesController,
        SpritesController,
        EventsController,
        GuildsController,
        ThemesController,
        AdminController,
        LeaguesController
    ],
    providers: [
        DiscordApiService,
        AuthentificationService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseReshapeInterceptor,
        },
    ],
})
export class PalantirModule { }
