import { IEventsService } from "src/modules/palantir/service/events.service.interface";
import { EventDropReply, EventReply, EventsDefinition } from "../proto-compiled/events";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GrpcBaseService } from "./grpc-base.abstract";
import { EventDto, EventDropDto } from "src/modules/palantir/dto/events.dto";
import { DtoCache } from "src/utils/dtoCache";

@Injectable()
export class GrpcEventsService extends GrpcBaseService<EventsDefinition> implements IEventsService {

    private eventCache = new DtoCache<EventDto, number>(s => s.id, 60 * 1000);

    constructor(config: ConfigService) {
        super(EventsDefinition, config);
    }

    private eventReplyToDto(reply: EventReply): EventDto {
        return {
            ...reply,
            eventLength: reply.length,
            eventStart: reply.start
        };
    }

    private async eventDropReplyToDto(reply: EventDropReply): Promise<EventDropDto> {
        const event = await this.eventCache.getOrFetch(
            reply.eventId,
            () => this.getEvent(reply.eventId)
        );

        return {
            ...reply,
            event
        };
    }

    async getAllEvents(): Promise<EventDto[]> {
        const events = await this.collectFromAsyncIterable(this.grpcClient.getAllEvents({}));
        return events.map(t => this.eventReplyToDto(t));
    }

    async getEvent(id: number): Promise<EventDto> {
        const event = await this.grpcClient.getEventById({ id });
        return this.eventReplyToDto(event);
    }

    async getAllEventDrops(): Promise<EventDropDto[]> {
        const drops = await this.collectFromAsyncIterable(this.grpcClient.getAllEventDrops({}));
        return await Promise.all(
            drops.map(t => this.eventDropReplyToDto(t))
        );
    }

    async getEventDrop(id: number): Promise<EventDropDto> {
        const drop = await this.grpcClient.getEventDropById({ id });
        return this.eventDropReplyToDto(drop);
    }

    async getEventDropsOfEvent(id: number): Promise<EventDropDto[]> {
        const drops = await this.collectFromAsyncIterable(this.grpcClient.getEventDropsOfEvent({ id }));
        return await Promise.all(
            drops.map(t => this.eventDropReplyToDto(t))
        );
    }
}