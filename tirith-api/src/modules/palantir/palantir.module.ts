import { AuthenticationService } from 'src/services/authentication.service';
import { LobbiesController } from './controller/lobbies.controller';
/*
https://docs.nestjs.com/modules
*/

import { MembersController } from './controller/members.controller';
import { Module } from '@nestjs/common';
import {APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core';
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
import {CloudController} from "./controller/cloud.controller";
import {InventoryController} from "./controller/inventory.controller";
import {EmojisController} from "./controller/emojis.controller";
import {AnnouncementsController} from "./controller/announcements.controller";
import {CryptoService} from "../../services/crypto.service";
import {OpenIdService} from "../auth/service/openid.service";

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
        LeaguesController,
        CloudController,
        InventoryController,
        EmojisController,
        AnnouncementsController
    ],
    providers: [
        DiscordApiService,
        AuthenticationService,
        CryptoService,
        OpenIdService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseReshapeInterceptor,
        },
    ],
})
export class PalantirModule { }
