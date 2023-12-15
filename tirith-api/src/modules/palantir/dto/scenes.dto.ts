import { XApiProperty } from "src/decorators/apiProperty.decorator";
import { EventDto } from "./events.dto";

export class SceneDto {

    @XApiProperty({ description: "Scene name" })
    name: string;

    @XApiProperty({ description: "Scene unique ID" })
    id: number;

    @XApiProperty({ description: "Scene url" })
    url: string;

    @XApiProperty({ description: "Associated event" })
    event?: EventDto;

    @XApiProperty({ description: "Primary text color" })
    primaryColor?: string;

    @XApiProperty({ description: "Guessed text color" })
    guessedColor?: string;

    @XApiProperty({ description: "Scene artist name" })
    artist?: string;
}