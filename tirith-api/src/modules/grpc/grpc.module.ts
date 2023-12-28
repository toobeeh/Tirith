/*
https://docs.nestjs.com/modules
*/

import { Module, Provider } from '@nestjs/common';
import { GrpcScenesService } from './services/grpc-scenes.service';
import { IScenesService } from '../palantir/service/scenes.service.interface';
import { IEventsService } from '../palantir/service/events.service.interface';
import { ISpritesService } from '../palantir/service/sprites.service.interface';
import { IThemesService } from '../palantir/service/themes.service.interface';
import { IAwardsService } from '../palantir/service/awards.service.interface';
import { GrpcAwardsService } from './services/grpc-awards.service';
import { GrpcEventsService } from './services/grpc-events.service';
import { GrpcSpritesService } from './services/grpc-sprites.service';
import { GrpcThemessService } from './services/grpc-themes.service';
import { APP_FILTER } from '@nestjs/core';
import { GrpcExceptionsFilter } from './grpc-exception.filter';

const services: Provider[] = [
    { provide: IScenesService, useClass: GrpcScenesService },
    { provide: IEventsService, useClass: GrpcEventsService },
    { provide: ISpritesService, useClass: GrpcSpritesService },
    { provide: IThemesService, useClass: GrpcThemessService },
    { provide: IAwardsService, useClass: GrpcAwardsService },
]

@Module({
    imports: [],
    controllers: [],
    providers: [
        ...services,
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
