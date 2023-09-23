import { XApiProperty } from "src/decorators/apiProperty.decorator";

export class UpdateDiscordID {

    @XApiProperty({ description: "The id of the new linked discord account" })
    id: string;
}