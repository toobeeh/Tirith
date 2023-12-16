import { XApiProperty } from "src/decorators/apiProperty.decorator";
import { EventDropDto } from "./events.dto";

export class SpriteDto {

    @XApiProperty({ description: "Sprite name" })
    name: string;

    @XApiProperty({ description: "Sprite unique ID" })
    id: number;

    @XApiProperty({ description: "Sprite cost in bubbles or eventdrops" })
    cost: number;

    @XApiProperty({ description: "Sprite url" })
    url: string;

    @XApiProperty({ description: "Associated event drop", required: false })
    eventDrop?: EventDropDto;

    @XApiProperty({ description: "Flag for rainbow shift" })
    isRainbowAllowed: boolean;

    @XApiProperty({ description: "Flag for special sprite", required: false })
    isSpecial?: boolean;

    @XApiProperty({ description: "Sprite artist name", required: false })
    artist?: string;
}