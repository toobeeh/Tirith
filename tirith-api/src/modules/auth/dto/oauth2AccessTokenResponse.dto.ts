import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class OAuth2AccessTokenResponseDto {
    @XApiProperty({ description: "The issued jwt access token for member and client" })
    access_token: string;  // naming acc to oauth spec

    @XApiProperty({ description: "The returned token type" })
    token_type: string;  // naming acc to oauth spec

    @XApiProperty({ description: "The returned token type kind for token-exchange grant", required: false })
    issued_token_type?: string;  // naming acc to oauth spec

    @XApiProperty({ description: "The expiry time in seconds" })
    expires_in: number;  // naming acc to oauth spec

    @XApiProperty({ description: "The scope of the generated token" })
    scope?: string;  // naming acc to oauth spec
}