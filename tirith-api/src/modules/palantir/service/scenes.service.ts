/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PalantirdbService } from '../../../services/palantirdb.service';
import { EventsService } from './events.service';
import { SceneDto } from 'src/modules/palantir/dto/scenes.dto';
import { Scenes } from 'palantir-db/dist/src/schema';
import { IScenesService } from './scenes.service.interface';

@Injectable()
export class ScenesService implements IScenesService {

    private get database() { return this.databaseService.database; }

    constructor(private databaseService: PalantirdbService, private eventsService: EventsService) { }

    private async mapToDto(scene: Scenes): Promise<SceneDto> {
        return {
            name: scene.Name,
            event: scene.EventID == 0 ? undefined : await this.eventsService.getEvent(scene.EventID),
            id: scene.ID,
            guessedColor: scene.GuessedColor,
            primaryColor: scene.Color,
            artist: scene.Artist.length > 0 ? scene.Artist : undefined,
            url: scene.URL,
            exclusive: scene.Exclusive == 1
        }
    }

    async getAllScenes(): Promise<SceneDto[]> {
        console.time();
        const scenes = await this.database.getAllScenes();
        if (!scenes.success) throw new HttpException("Could not load events", HttpStatus.INTERNAL_SERVER_ERROR);

        console.timeEnd();

        return Promise.all(scenes.result.map(async scene => this.mapToDto(scene)));
    }

    async getScene(id: number): Promise<SceneDto> {
        const scene = await this.database.getScene(id);
        if (!scene.success) throw new HttpException("Scene " + id + " not found", HttpStatus.NOT_FOUND);

        return this.mapToDto(scene.result);
    }
}
