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