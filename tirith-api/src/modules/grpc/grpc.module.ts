/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { GrpcScenesService } from './grpc-scenes.service';
import { IScenesService } from '../palantir/service/scenes.service.interface';

@Module({
    imports: [],
    controllers: [],
    providers: [
        { provide: IScenesService, useClass: GrpcScenesService }
    ],
    exports: [
        { provide: IScenesService, useClass: GrpcScenesService }
    ],
})
export class GrpcModule { }
