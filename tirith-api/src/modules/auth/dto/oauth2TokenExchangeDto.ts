import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class OAuth2TokenExchangeDto {

    @XApiProperty({ description: "The oauth2 grant type" })
    grant_type: string; // naming acc to oauth spec

    @XApiProperty({ description: "An authorization code received from the OAuth2 client, required for grant_type=code", required: false })
    code?: string; // naming acc to oauth spec

    @XApiProperty({ description: "The client ID of the OAuth2 client, required for grant_type=code", required: false })
    client_id?: number; // naming acc to oauth spec

    @XApiProperty({ description: "An access token to be exchanged, required for grant_type=token-exchange", required: false })
    subject_token?: string; // naming acc to oauth spec

    @XApiProperty({ description: "The type of the subject token, required for grant_type=token-exchange", required: false })
    subject_token_type?: string; // naming acc to oauth spec

    @XApiProperty({ description: "The requested audience of the subject token, required for grant_type=token-exchange", required: false })
    audience?: string; // naming acc to oauth spec
}