import { XApiProperty } from "src/decorators/apiProperty.decorator";

export class AwardDto {

    @XApiProperty({ description: "Award name" })
    name: string;

    @XApiProperty({ description: "Award unique ID" })
    id: number;

    @XApiProperty({ description: "Award description" })
    description: string;

    @XApiProperty({ description: "Award icon url" })
    url: string;

    @XApiProperty({ description: "Rarity level" })
    rarity: number;
}