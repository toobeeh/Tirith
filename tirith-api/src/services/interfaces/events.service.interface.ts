import { EventDropDto, EventDto } from "../../modules/palantir/dto/events.dto";

export const IEventsService = Symbol("IEventsService");

export interface IEventsService {

    /**
     * Get all available Events
     */
    getAllEvents(): Promise<EventDto[]>;

    /**
     * Get a Event 
     * @param id the Event id
     */
    getEvent(id: number): Promise<EventDto>;

    /**
     * gets all event drops
     */
    getAllEventDrops(): Promise<EventDropDto[]>

    /**
     * get event drop by id
     * @param id drop id
     */
    getEventDrop(id: number): Promise<EventDropDto>

    /**
     * gets all event drops of an event
     * @param id event id
     */
    getEventDropsOfEvent(id: number): Promise<EventDropDto[]>
}