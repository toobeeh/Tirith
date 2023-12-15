/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventDto } from 'src/modules/palantir/dto/events.dto';
import { PalantirdbService } from './palantirdb.service';
import { Events } from 'palantir-db/dist/src/schema';

@Injectable()
export class EventsService {

    private get database() { return this.databaseService.database; }

    constructor(private databaseService: PalantirdbService) { }

    private mapToDto(event: Events): EventDto {
        return {
            name: event.EventName,
            id: event.EventID,
            description: event.Description,
            eventLength: event.DayLength,
            eventStart: event.ValidFrom
        }
    }

    async getAllEvents(): Promise<EventDto[]> {
        const events = await this.database.getAllEvents();
        if (!events.success) throw new HttpException("Could not load events", HttpStatus.INTERNAL_SERVER_ERROR);

        return events.result.map(event => this.mapToDto(event));
    }

    async getEvent(id: number): Promise<EventDto> {
        const event = await this.database.getEvent(id);
        if (!event.success) throw new HttpException("Event " + id + " not found", HttpStatus.NOT_FOUND);

        return this.mapToDto(event.result);
    }
}
