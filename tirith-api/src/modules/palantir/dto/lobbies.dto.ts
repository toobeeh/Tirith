import { XApiProperty } from "src/decorators/apiProperty.decorator";

export class LobbyPlayerDto {

    @XApiProperty({ description: "Player name" })
    name: string;

    @XApiProperty({ description: "Player score" })
    score: number;

    @XApiProperty({ description: "Whether the player is the drawer" })
    drawing: boolean;

    @XApiProperty({ description: "Player join ID" })
    lobbyPlayerId: number;
}

export class OnlineLobbySkribblDetailsDto {

    @XApiProperty({ description: "Lobby skribbl ID (part of the link)" })
    id: string;

    @XApiProperty({ description: "Indicator if the lobby is private" })
    private: boolean;

    @XApiProperty({ description: "The lobby's current round" })
    round: number;

    @XApiProperty({ description: "The lobby's current players", type: () => LobbyPlayerDto, isArray: true })
    players: LobbyPlayerDto[];

    @XApiProperty({ description: "The lobby language" })
    language: string;
}


export class OnlineLobbyTypoPlayerDto {

    @XApiProperty({ description: "Skribbl lobby player join ID" })
    lobbyPlayerID: number;

    @XApiProperty({ description: "Typo id" })
    login: number;
}

export class OnlineLobbyDto {

    @XApiProperty({ description: "Lobby description" })
    description: string;

    @XApiProperty({ description: "Lobby las updated timestamp" })
    lastUpdated: string;

    @XApiProperty({ description: "Lobby typo ownership claim" })
    ownershipClaim: string;

    @XApiProperty({ description: "Lobby skribbl details", type: () => OnlineLobbySkribblDetailsDto })
    skribblDetails: OnlineLobbySkribblDetailsDto;

    @XApiProperty({ description: "Lobby palantir details", type: () => OnlineLobbyTypoPlayerDto, isArray: true })
    typoPlayers: OnlineLobbyTypoPlayerDto[];
}