import {XApiProperty} from "../../../decorators/apiProperty.decorator";
import {OAuth2ClientDto} from "./oauth2Client.dto";

export class OAuth2AuthorizationCodeDto {

    @XApiProperty({description: "The authorization code issued for the authenticated user and client"})
    authorizationCode: string;

    @XApiProperty({description: "The client details for which the authorization code was issued", type: () => OAuth2ClientDto})
    client: OAuth2ClientDto;
}