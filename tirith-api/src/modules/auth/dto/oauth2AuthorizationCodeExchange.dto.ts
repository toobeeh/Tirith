import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class OAuth2AuthorizationCodeExchangeDto {
    @XApiProperty({ description: "The authorization code received from the OAuth2 client" })
    code: string; // naming acc to oauth spec

    @XApiProperty({ description: "The client ID of the OAuth2 client" })
    client_id: number; // naming acc to oauth spec

    @XApiProperty({ description: "The typo ID of the user requesting the exchange" })
    grant_type: string; // naming acc to oauth spec
}