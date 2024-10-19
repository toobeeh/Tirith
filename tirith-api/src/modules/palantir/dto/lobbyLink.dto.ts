import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class LobbyLinkDto {

    @XApiProperty({ description: "Link for a lobby" })
    link: string;
}