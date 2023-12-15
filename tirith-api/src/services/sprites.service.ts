/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PalantirdbService } from './palantirdb.service';
import { Sprites } from 'palantir-db/dist/src/schema';
import { DropsService } from './drops.service';
import { SpriteDto } from 'src/modules/palantir/dto/sprites.dto';
import { EventDropDto } from 'src/modules/palantir/dto/drops.dto';
import { DtoCache } from './dtoCache';
import { EventsService } from './events.service';

@Injectable()
export class SpritesService {

    private get database() { return this.databaseService.database; }

    private eventDropCache = new DtoCache<EventDropDto, number>(s => s.id, 60 * 1000);

    constructor(private databaseService: PalantirdbService, private eventsService: EventsService) { }

    private async mapToDto(sprite: Sprites): Promise<SpriteDto> {

        const eventDrop = sprite.EventDropID == 8 || sprite.EventDropID == 0 ? undefined : await this.eventDropCache.getOrFetch(
            sprite.EventDropID,
            () => this.eventsService.getEventDrop(sprite.EventDropID)
        );

        return {
            name: sprite.Name,
            eventDrop: eventDrop,
            id: sprite.ID,
            artist: sprite.Artist,
            url: sprite.URL,
            isRainbowAllowed: sprite.Rainbow == 1,
            isSpecial: sprite.Special == 1
        };
    }

    async getAllSprites(): Promise<SpriteDto[]> {
        const sprites = await this.database.getAllSprites();
        if (!sprites.success) throw new HttpException("Could not load sprites", HttpStatus.INTERNAL_SERVER_ERROR);

        return Promise.all(sprites.result.map(async sprite => this.mapToDto(sprite)));
    }

    async getSprites(id: number): Promise<SpriteDto> {
        const sprite = await this.database.getSprite(id);
        if (!sprite.success) throw new HttpException("Sprite " + id + " not found", HttpStatus.NOT_FOUND);

        return this.mapToDto(sprite.result);
    }
}
