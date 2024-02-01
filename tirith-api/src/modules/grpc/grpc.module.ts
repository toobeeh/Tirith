/*
https://docs.nestjs.com/modules
*/

import { Module, Provider } from '@nestjs/common';
import { GrpcScenesService } from './services/grpc-scenes.service';
import { IScenesService } from '../../services/interfaces/scenes.service.interface';
import { IEventsService } from '../../services/interfaces/events.service.interface';
import { ISpritesService } from '../../services/interfaces/sprites.service.interface';
import { IThemesService } from '../../services/interfaces/themes.service.interface';
import { IAwardsService } from '../../services/interfaces/awards.service.interface';
import { GrpcAwardsService } from './services/grpc-awards.service';
import { GrpcEventsService } from './services/grpc-events.service';
import { GrpcSpritesService } from './services/grpc-sprites.service';
import { GrpcThemessService } from './services/grpc-themes.service';
import { APP_FILTER } from '@nestjs/core';
import { GrpcExceptionsFilter } from './grpc-exception.filter';
import { IGuildsService } from '../../services/interfaces/guilds.service.interface';
import { GrpcGuildsService } from './services/grpc-guilds.service';
import { ILobbiesService } from '../../services/interfaces/lobbies.service.interface';
import { GrpcLobbiesService } from './services/grpc-lobbies.service';
import { IMembersService } from '../../services/interfaces/members.service.interface';
import { GrpcMembersService } from './services/grpc-members.service';
import { DiscordApiService } from 'src/services/discord-api.service';
import { HttpModule } from '@nestjs/axios';

const services: Provider[] = [
    { provide: IScenesService, useClass: GrpcScenesService },
    { provide: IEventsService, useClass: GrpcEventsService },
    { provide: ISpritesService, useClass: GrpcSpritesService },
    { provide: IThemesService, useClass: GrpcThemessService },
    { provide: IAwardsService, useClass: GrpcAwardsService },
    { provide: IGuildsService, useClass: GrpcGuildsService },
    { provide: ILobbiesService, useClass: GrpcLobbiesService },
    { provide: IMembersService, useClass: GrpcMembersService }
]

@Module({
    imports: [
        HttpModule
    ],
    controllers: [],
    providers: [
        ...services,
        DiscordApiService,
        {
            provide: APP_FILTER,
            useClass: GrpcExceptionsFilter,
        },
    ],
    exports: [
        ...services
    ],
})
export class GrpcModule { }
