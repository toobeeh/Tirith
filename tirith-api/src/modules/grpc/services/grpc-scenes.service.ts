/*
https://docs.nestjs.com/providers#services
*/

import {Inject, Injectable} from '@nestjs/common';
import { IScenesService } from '../../../services/interfaces/scenes.service.interface';
import { SceneDto } from '../../palantir/dto/scenes.dto';
import { ConfigService } from '@nestjs/config';
import { ScenesDefinition} from '../proto-compiled/scenes';
import { GrpcBaseService } from './grpc-base';
import {GrpcEventsService} from "./grpc-events.service";
import {IEventsService} from "../../../services/interfaces/events.service.interface";

@Injectable()
export class GrpcScenesService extends GrpcBaseService<ScenesDefinition> implements IScenesService {

    constructor(config: ConfigService, @Inject(IEventsService) private eventsService: GrpcEventsService) {
        super(ScenesDefinition, config);
    }

    async getAllScenes(): Promise<SceneDto[]> {
        const events = await this.eventsService.getAllEvents();
        const themes = await this.collectFromAsyncIterable(this.grpcClient.getAllSceneThemes({}));

        const iter = this.grpcClient.getAllScenes({});
        const scenes = await this.collectFromAsyncIterable(iter);
        const mapped: SceneDto[] = scenes.map(scene => ({
            ...scene,
            event: events.find(event => event.id == scene.eventId),
            themes: themes.filter(t => t.sceneId === scene.id).map(t => ({name: t.name, shift: t.shift}))
        }));
        return mapped;
    }

    async getScene(id: number): Promise<SceneDto> {
        const scene = await this.grpcClient.getSceneById({ id });
        const themes = await this.collectFromAsyncIterable(this.grpcClient.getThemesOfScene({ id }));
        const event = scene.eventId > 0 ? await this.eventsService.getEvent(scene.eventId) : undefined;

        return {
            ...scene,
            event,
            themes: themes.map(t => ({name: t.name, shift: t.shift}))
        };
    }
}
