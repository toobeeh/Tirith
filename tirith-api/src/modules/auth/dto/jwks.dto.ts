import {jwksKey} from "../../../services/crypto.service";
import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class JwksDto implements jwksKey{

    @XApiProperty({description: "Key type, typically 'RSA'"})
    kty: string;

    @XApiProperty({description: "Key use, typically 'sig' for signature"})
    use: string;

    @XApiProperty({description: "Key ID, a unique identifier for the key"})
    kid: string;

    @XApiProperty({description: "Algorithm used with the key, typically 'RS256'"})
    alg: string;

    @XApiProperty({description: "Modulus of the RSA key, base64url encoded"})
    n: string;

    @XApiProperty({description: "Exponent of the RSA key, base64url encoded"})
    e: string;

    @XApiProperty({description: "Private key is not exposed in JWKS", required: false})
    d?: string; // private key is not exposed in JWKS
}