import { XApiProperty } from "src/decorators/apiProperty.decorator";
import { EventDropDto } from "./drops.dto";

export class SpriteDto {

    @XApiProperty({ description: "Sprite name" })
    name: string;

    @XApiProperty({ description: "Sprite unique ID" })
    id: number;

    @XApiProperty({ description: "Sprite url" })
    url: string;

    @XApiProperty({ description: "Associated event drop" })
    eventDrop?: EventDropDto;

    @XApiProperty({ description: "Flag for rainbow shift" })
    isRainbowAllowed: boolean;

    @XApiProperty({ description: "Flag for special sprite" })
    isSpecial?: boolean;

    @XApiProperty({ description: "Sprite artist name" })
    artist?: string;
}