import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class OAuth2AuthenticationDto {

    @XApiProperty({description: "The authorization code received from Discord OAuth2"})
    discordAuthorizationCode: string;

    @XApiProperty({description: "The client ID of the application requesting authentication"})
    clientId: number;
}