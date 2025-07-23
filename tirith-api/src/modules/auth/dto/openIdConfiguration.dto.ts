import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class OpenIdConfigurationDto {

    @XApiProperty({description: "Issuer server identifier"})
    issuer: string;

    @XApiProperty({description: "JWKS URI for public key used to verify signatures"})
    jwks_uri: string;

    @XApiProperty({description: "Typo OAuth2 authorization endpoint"})
    authorization_endpoint: string;

    @XApiProperty({description: "Typo OAuth2 token endpoint"})
    token_endpoint: string;

    @XApiProperty({description: "Typo user profile claims endpoint"})
    userinfo_endpoint: string;

    @XApiProperty({description: "Empty scopes; scopes are assigned by client"})
    scopes_supported: [];

    @XApiProperty({description: "Supported token claims"})
    claims_supported: string[];

    @XApiProperty({description: "Only code flow supported"})
    response_types_supported: ["code"];

    @XApiProperty({description: "Only public subject types"})
    subject_types_supported: ["public"];

    @XApiProperty({description: "RS256 Signing algorithms for ID tokens"})
    id_token_signing_alg_values_supported: ["RS256"];

    @XApiProperty({description: "No code challenge methods supported"})
    code_challenge_methods_supported: [];

    @XApiProperty({description: "No token endpoint authentication methods supported"})
    token_endpoint_auth_methods_supported: ["none"];
}