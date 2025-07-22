import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class OAuth2ClientDto {
    @XApiProperty({ description: 'The client ID of the OAuth2 client' })
    clientId: number;

    @XApiProperty({ description: 'The redirect URI for the OAuth2 client' })
    redirectUri: string;

    @XApiProperty({ description: 'The scopes requested by the OAuth2 client' })
    scopes: string[];

    @XApiProperty({ description: 'The name of the OAuth2 client ' })
    name: string;

    @XApiProperty({ description: 'Whether the client has been verified by typo' })
    verified: boolean;

    @XApiProperty({ description: 'Token expiry time in seconds' })
    tokenExpiry: number;
}