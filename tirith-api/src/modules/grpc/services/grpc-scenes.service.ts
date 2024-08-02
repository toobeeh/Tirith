/*
https://docs.nestjs.com/providers#services
*/

import {Inject, Injectable} from '@nestjs/common';
import { IScenesService } from '../../../services/interfaces/scenes.service.interface';
import { SceneDto } from '../../palantir/dto/scenes.dto';
import { ConfigService } from '@nestjs/config';
import { ScenesDefinition } from '../proto-compiled/scenes';
import { GrpcBaseService } from './grpc-base';
import {GrpcEventsService} from "./grpc-events.service";
import {IGuildsService} from "../../../services/interfaces/guilds.service.interface";
import {IMembersService} from "../../../services/interfaces/members.service.interface";
import {IEventsService} from "../../../services/interfaces/events.service.interface";

@Injectable()
export class GrpcScenesService extends GrpcBaseService<ScenesDefinition> implements IScenesService {

    constructor(config: ConfigService, @Inject(IEventsService) private eventsService: GrpcEventsService) {
        super(ScenesDefinition, config);
    }

    async getAllScenes(): Promise<SceneDto[]> {
        const events = await this.eventsService.getAllEvents();

        const iter = this.grpcClient.getAllScenes({});
        let scenes = await this.collectFromAsyncIterable(iter);
        scenes = scenes.map(scene => ({...scene, event: events.find(event => event.id == scene.eventId)}));
        return scenes;
    }

    async getScene(id: number): Promise<SceneDto> {
        return await this.grpcClient.getSceneById({ id });
    }
}
