import { XApiProperty } from "src/decorators/apiProperty.decorator";

export class PalantirLobbyPlayerDto {

    @XApiProperty({ description: "Player ingame name" })
    name: string;

    @XApiProperty({ description: "Player login" })
    login: string;

    @XApiProperty({ description: "Player account username" })
    username: string;
}

export class PalantirLobbyDto {
    @XApiProperty({ description: "Lobby description" })
    Description: string;

    @XApiProperty({ description: "Lobby invite encrypted" })
    Key: string;

    @XApiProperty({ description: "Lobby unique id" })
    ID: string;

    @XApiProperty({ description: "Lobby visibility restriction" })
    Restriction: string;
}

export class LobbyDetailsDto {

    @XApiProperty({ description: "The lobby language" })
    Language: string;

    @XApiProperty({ description: "The lobby link" })
    Link: string;

    @XApiProperty({ description: "Indicator if the lobby is private" })
    Private: boolean;

    @XApiProperty({ description: "The lobby's current round" })
    Round: string;

    @XApiProperty({ description: "The lobby's current round", type: () => LobbyPlayerDto, isArray: true })
    Players: LobbyPlayerDto[];
}

export class LobbiesResponseDto {

    @XApiProperty({ description: "Lobby palantir details", type: () => PalantirLobbyDto })
    lobby: PalantirLobbyDto;

    @XApiProperty({ description: "Lobby skribbl details", type: () => LobbyDetailsDto })
    details: LobbyDetailsDto;

    @XApiProperty({ description: "Lobby palantir players", type: () => PalantirLobbyPlayerDto, isArray: true })
    players: PalantirLobbyPlayerDto[];

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