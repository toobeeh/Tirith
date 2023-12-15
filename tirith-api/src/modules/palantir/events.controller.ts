/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventDto } from './dto/events.dto';
import { EventsService } from 'src/services/events.service';
import { EventDropDto } from './dto/drops.dto';

@Controller("events")
@ApiTags("events")
export class EventsController {

    constructor(private service: EventsService) { }

    @Get()
    @ApiResponse({ status: 200, type: EventDto, isArray: true, description: "An array containing all events" })
    async getAllEvents(): Promise<EventDto[]> {
        return this.service.getAllEvents();
    }

    @Get(":id")
    @ApiResponse({ status: 200, type: EventDto, description: "The event that matches the given ID" })
    async getEventById(@Param('id') id: number): Promise<EventDto> {
        return this.service.getEvent(id);
    }

    @Get("drops")
    @ApiResponse({ status: 200, type: EventDropDto, isArray: true, description: "An array containing all event drops" })
    async getAllEventDrops(): Promise<EventDropDto[]> {
        return this.service.getAllEventDrops();
    }

    @Get("drops/:id")
    @ApiResponse({ status: 200, type: EventDropDto, description: "The event drop that matches the given ID" })
    async getEventDrop(@Param('id') id: number): Promise<EventDropDto> {
        return this.service.getEventDrop(id);
    }
}
