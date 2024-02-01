/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { IScenesService } from '../../../services/interfaces/scenes.service.interface';
import { SceneDto } from '../../palantir/dto/scenes.dto';
import { ConfigService } from '@nestjs/config';
import { ScenesDefinition } from '../proto-compiled/scenes';
import { GrpcBaseService } from './grpc-base';

@Injectable()
export class GrpcScenesService extends GrpcBaseService<ScenesDefinition> implements IScenesService {

    constructor(config: ConfigService) {
        super(ScenesDefinition, config);
    }

    async getAllScenes(): Promise<SceneDto[]> {
        const iter = this.grpcClient.getAllScenes({});
        const scenes = await this.collectFromAsyncIterable(iter);
        return scenes;
    }

    async getScene(id: number): Promise<SceneDto> {
        return await this.grpcClient.getSceneById({ id });
    }
}
