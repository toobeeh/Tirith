import { PalantirLobbyDto } from "./lobbies.dto";
import { XApiProperty } from "src/decorators/apiProperty.decorator";

export class ReportsResponseDto extends PalantirLobbyDto {

    @XApiProperty({ description: "Guild id which the report targets" })
    GuildID: string;

    @XApiProperty({ description: "Lobby players", type: () => LobbyPlayerDto, isArray: true })
    Players: LobbyPlayerDto[];
}

export class LobbyPlayerDto {

    @XApiProperty({ description: "Player name" })
    Name: string;

    @XApiProperty({ description: "Player score" })
    Score: number;

    @XApiProperty({ description: "Whether the player is the drawer" })
    Drawing: boolean;

    @XApiProperty({ description: "Player join ID" })
    LobbyPlayerID: number;
}