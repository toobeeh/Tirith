import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class OAuth2ClientDto {
    @XApiProperty({ description: 'The client ID of the OAuth2 client' })
    clientId: number;

    @XApiProperty({ description: 'The allowed redirect URIs for the OAuth2 client' })
    redirectUris: string[];

    @XApiProperty({ description: 'The scopes requested by the OAuth2 client' })
    scopes: string[];

    @XApiProperty({ description: 'The name of the OAuth2 client ' })
    name: string;

    @XApiProperty({ description: 'Whether the client has been verified by typo' })
    verified: boolean;

    @XApiProperty({ description: 'Token expiry time in seconds' })
    tokenExpiry: number;

    @XApiProperty({ description: 'The typo id of the client owner' })
    ownerTypoId: number;

    @XApiProperty({ description: 'The audience of the OAuth2 client, typically the base url of the API that it accesses' })
    audience: string;
}

export class CreateOAuth2ClientDto {

    @XApiProperty({ description: 'The allowed OAuth2 redirect URIs for the OAuth2 client' })
    redirectUris: string[];

    @XApiProperty({ description: 'The scopes requested by the OAuth2 client' })
    scopes: string[];

    @XApiProperty({ description: 'The name of the OAuth2 client' })
    name: string;

    @XApiProperty({ description: 'The audience of the OAuth2 client, typically the base url of the API that it accesses' })
    audience: string;
}