import { XApiProperty } from "src/decorators/apiProperty.decorator";

export class DropDto {

    @XApiProperty({ description: "Drop ID" })
    DropID: number;

    @XApiProperty({ description: "Lobby where the drop has been caught" })
    CaughtLobbyKey: string;

    @XApiProperty({ description: "Discord User ID of the catcher" })
    CaughtLobbyPlayerID: string;

    @XApiProperty({ description: "Timestamp of the drop" })
    ValidFrom: string;

    @XApiProperty({ description: "Event Drop ID" })
    EventDropID: number;

    @XApiProperty({ description: "Response time of the catch" })
    LeagueWeight: number;
}