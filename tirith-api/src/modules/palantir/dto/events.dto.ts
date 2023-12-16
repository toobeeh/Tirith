import { XApiProperty } from "src/decorators/apiProperty.decorator";

export class EventDto {

    @XApiProperty({ description: "Event name" })
    name: string;

    @XApiProperty({ description: "Event unique ID" })
    id: number;

    @XApiProperty({ description: "Event description" })
    description: string;

    @XApiProperty({ description: "Event start date" })
    eventStart: string;

    @XApiProperty({ description: "Event length in days" })
    eventLength: number;
}

export class EventDropDto {

    @XApiProperty({ description: "Unique event drop ID" })
    id: number;

    @XApiProperty({ description: "Drop name" })
    name: string;

    @XApiProperty({ description: "Drop URL" })
    url: string;

    @XApiProperty({ description: "Associated event" })
    event: EventDto;
}