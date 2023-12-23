/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { IScenesService } from '../palantir/service/scenes.service.interface';
import { SceneDto } from '../palantir/dto/scenes.dto';
import { ConfigService } from '@nestjs/config';
import { createChannel, createClient } from 'nice-grpc';
import { SceneReply, ScenesClient, ScenesDefinition } from './proto-compiled/scenes';

@Injectable()
export class GrpcScenesService implements IScenesService {

    private readonly grpcClient: ScenesClient;

    constructor(config: ConfigService) {
        const channelUrl = config.getOrThrow("GRPC_VALMAR_CHANNEL");
        const channel = createChannel(channelUrl);
        this.grpcClient = createClient(ScenesDefinition, channel);
    }

    async getAllScenes(): Promise<SceneDto[]> {
        const iterator = this.grpcClient.getAllScenes({});

        console.time();
        const scenes: SceneReply[] = [];
        for await (const scene of iterator) {
            scenes.push(scene);
        }
        console.timeEnd();

        return scenes;
    }

    getScene(id: number): Promise<SceneDto> {
        throw new Error('Method not implemented.');
    }



}
