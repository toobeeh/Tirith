import { XApiProperty } from "src/decorators/apiProperty.decorator";

export class GuildInviteDto {

    @XApiProperty({ description: "Name of the server" })
    name: string;

    @XApiProperty({ description: "Palantir connection token of the server" })
    token: number;

    @XApiProperty({ description: "Current icon url of the guild" })
    iconUrl: string;

    @XApiProperty({ description: "Amount of connected members" })
    connectedMembers: number;
}