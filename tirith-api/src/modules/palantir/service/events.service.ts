/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PalantirdbService } from '../../../services/palantirdb.service';
import { EventDrops, Events } from 'palantir-db/dist/src/schema';
import { DtoCache } from '../../../utils/dtoCache';
import { EventDropDto, EventDto } from 'src/modules/palantir/dto/events.dto';

@Injectable()
export class EventsService {

    private eventCache = new DtoCache<EventDto, number>(s => s.id, 60 * 1000);
    private get database() { return this.databaseService.database; }

    constructor(private databaseService: PalantirdbService) { }

    private mapEventToDto(event: Events): EventDto {
        return {
            name: event.EventName,
            id: event.EventID,
            description: event.Description,
            eventLength: event.DayLength,
            eventStart: event.ValidFrom
        }
    }

    private async mapEventDropToDto(drop: EventDrops): Promise<EventDropDto> {

        const event = drop.EventID == 1000 ? undefined : await this.eventCache.getOrFetch(
            drop.EventID,
            () => this.getEvent(drop.EventID)
        );

        return {
            name: drop.Name,
            id: drop.EventDropID,
            url: drop.URL,
            event: event
        };
    }

    async getAllEvents(): Promise<EventDto[]> {
        const events = await this.database.getAllEvents();
        if (!events.success) throw new HttpException("Could not load events", HttpStatus.INTERNAL_SERVER_ERROR);

        return events.result.map(event => this.mapEventToDto(event));
    }

    async getEvent(id: number): Promise<EventDto> {
        const event = await this.database.getEvent(id);
        if (!event.success) throw new HttpException("Event " + id + " not found", HttpStatus.NOT_FOUND);

        return this.mapEventToDto(event.result);
    }

    async getAllEventDrops(eventId?: number): Promise<EventDropDto[]> {
        const drops = await this.database.getAllEventDrops(eventId);
        if (!drops.success) throw new HttpException("Could not load event drops", HttpStatus.INTERNAL_SERVER_ERROR);

        return Promise.all(drops.result.map(drop => this.mapEventDropToDto(drop)));
    }

    async getEventDrop(id: number): Promise<EventDropDto> {
        const drop = await this.database.getEventDrop(id);
        if (!drop.success) throw new HttpException("Event drop " + id + " not found", HttpStatus.NOT_FOUND);

        return this.mapEventDropToDto(drop.result);
    }
}
