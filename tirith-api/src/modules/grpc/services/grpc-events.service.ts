import { IEventsService } from "src/modules/palantir/service/events.service.interface";
import { EventsDefinition } from "../proto-compiled/events";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GrpcBaseService } from "./grpc-base.abstract";
import { EventDto, EventDropDto } from "src/modules/palantir/dto/events.dto";

@Injectable()
export class GrpcEventsService extends GrpcBaseService<EventsDefinition> implements IEventsService {

    constructor(config: ConfigService) {
        super(EventsDefinition, config);
    }

    getAllEvents(): Promise<EventDto[]> {
        throw new Error("Method not implemented.");
    }

    getEvent(id: number): Promise<EventDto> {
        throw new Error("Method not implemented.");
    }

    getAllEventDrops(): Promise<EventDropDto[]> {
        throw new Error("Method not implemented.");
    }

    getEventDrop(id: number): Promise<EventDropDto> {
        throw new Error("Method not implemented.");
    }

    getEventDropsOfEvent(id: number): Promise<EventDropDto[]> {
        throw new Error("Method not implemented.");
    }
}