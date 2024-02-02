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

// export class GuildConnectionDto {

//     @XApiProperty({ description: "Name of the server" })
//     name: string;

//     @XApiProperty({ description: "Palantir connection token of the server" })
//     token: number;

//     @XApiProperty({ description: "Channel id of the palantir message" })
//     channelId: string;

//     @XApiProperty({ description: "Message id of the palantir message" })
//     messageId: string;

//     @XApiProperty({ description: "Guild discord id" })
//     id: string;
// }