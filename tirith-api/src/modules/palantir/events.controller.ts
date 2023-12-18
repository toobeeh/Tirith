/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventDropDto, EventDto } from './dto/events.dto';
import { EventsService } from 'src/services/events.service';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';

@ApiSecurityNotes()
@Controller("events")
@ApiTags("events")
export class EventsController {

    constructor(private service: EventsService) { }

    @Get()
    @ApiOperation({ summary: "Get all events" })
    @ApiResponse({ status: 200, type: EventDto, isArray: true, description: "An array containing all events" })
    async getAllEvents(): Promise<EventDto[]> {
        return this.service.getAllEvents();
    }

    @Get("drops")
    @ApiOperation({ summary: "Get all event drops" })
    @ApiResponse({ status: 200, type: EventDropDto, isArray: true, description: "An array containing all event drops" })
    async getAllEventDrops(): Promise<EventDropDto[]> {
        return this.service.getAllEventDrops();
    }

    @Get("drops/:id")
    @ApiOperation({ summary: "Get an event drop by ID" })
    @ApiResponse({ status: 200, type: EventDropDto, description: "The event drop that matches the given ID" })
    async getEventDrop(@Param('id') id: number): Promise<EventDropDto> {
        return this.service.getEventDrop(id);
    }

    @Get(":id")
    @ApiOperation({ summary: "Get an event by ID" })
    @ApiResponse({ status: 200, type: EventDto, description: "The event that matches the given ID" })
    async getEventById(@Param('id') id: number): Promise<EventDto> {
        return this.service.getEvent(id);
    }

    @Get(":id/drops/")
    @ApiOperation({ summary: "Get all event drops of an event" })
    @ApiResponse({ status: 200, type: EventDropDto, isArray: true, description: "All event drops of an event" })
    async getEventDropsOfEvent(@Param('id') id: number): Promise<EventDropDto[]> {
        return this.service.getAllEventDrops(id);
    }
}
