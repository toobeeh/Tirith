import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {CryptoService} from "../../../services/crypto.service";
import {JwkDto, JwksDto} from "../dto/jwks.dto";
import {OpenIdConfigurationDto} from "../dto/openIdConfiguration.dto";
import { pem2jwk } from 'pem-jwk';
import * as jwt from "jsonwebtoken";

@Injectable()
export class OpenIdService {

    private readonly _jwks: JwksDto;
    private readonly _openIdConfig: OpenIdConfigurationDto;
    private readonly _baseUrl: string;
    private readonly _authUrl: string;
    private readonly _audience: string;

    constructor(private config: ConfigService, private cryptoService: CryptoService) {
        this._jwks = {keys:[this.parseJwk(this.cryptoService.publicKey)]};
        this._baseUrl = this.config.get("API_BASE_URL");
        this._audience = this.config.get("API_BASE_URL");
        this._authUrl = this.config.get("AUTH_ENDPOINT");
        this._openIdConfig = this.buildOpenIdConfig();
    }

    private parseJwk(publicKey: string): JwkDto {
        const jwk = pem2jwk(publicKey);

        return {
            kty: jwk.kty,
            use: 'sig',
            kid: "default", // only one key used
            alg: 'RS256',
            n: jwk.n,
            e: jwk.e
        };
    }

    private buildOpenIdConfig(): OpenIdConfigurationDto {
        return {
            issuer: `${this._baseUrl}/openid`,
            jwks_uri: `${this._baseUrl}/openid/jwks.json`,
            authorization_endpoint: this._authUrl,
            token_endpoint: `${this.config.get("API_BASE_URL")}/oauth2/token`,
            userinfo_endpoint: `${this.config.get("API_BASE_URL")}/openid/userinfo`,
            scopes_supported: [],
            response_types_supported: ["code"],
            grant_types_supported: [
                "authorization_code",
                "urn:ietf:params:oauth:grant-type:token-exchange"
            ],
            subject_types_supported: ["public"],
            id_token_signing_alg_values_supported: ["RS256"],
            claims_supported: ["sub", "iss", "exp", "aud", "name", "azp"],
            code_challenge_methods_supported: [],
            token_endpoint_auth_methods_supported: ["none"]
        }
    }

    public get jwks(){
        return this._jwks;
    }

    public get audience(): string {
        return this._audience;
    }

    public get openIdConfig(): OpenIdConfigurationDto {
        return this._openIdConfig;
    }

    public verifyJwt(token: string, validateAudience = true) {
        return jwt.verify(token, this.cryptoService.publicKey, {
            algorithms: ['RS256'],
            ignoreExpiration: false,
            issuer: this.openIdConfig.issuer,
            audience: validateAudience ? this.audience : undefined
        });
    }

}