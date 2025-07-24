import {Injectable, NotFoundException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {GrpcBaseService} from "./grpc-base";
import {AuthorizationDefinition} from "../proto-compiled/authorization";
import {IAuthorizationService} from "../../../services/interfaces/authorization.service.interface";
import {OAuth2ClientDto} from "../../auth/dto/oauth2Client.dto";
import {OAuth2AuthorizationCodeDto} from "../../auth/dto/oauth2AuthorizationCode.dto";
import {ScopeDto} from "../../auth/dto/scope.dto";

@Injectable()
export class GrpcAuthorizationService extends GrpcBaseService<AuthorizationDefinition> implements IAuthorizationService {

    constructor(config: ConfigService) {
        super(AuthorizationDefinition, config);
    }

    async getScopes(): Promise<ScopeDto[]> {
        const scopes: ScopeDto[] = await this.collectFromMappedAsyncIterable(this.grpcClient.getAvailableScopes({}), item => ({
            name: item.name,
            description: item.description
        }));

        return scopes;
    }

    async getOauthClients(): Promise<OAuth2ClientDto[]> {
        return await this.collectFromMappedAsyncIterable(this.grpcClient.getOauth2Clients({}), client => ({
            ...client,
            tokenExpiry: client.tokenExpiry.toNumber()
        }));
    }

    async getOauthClientById(clientId: number): Promise<OAuth2ClientDto> {
        const clients = await this.getOauthClients();
        const client = clients.find(c => c.clientId === clientId);
        if (!client) {
            throw new NotFoundException(`OAuth2 client with ID ${clientId} not found`);
        }

        return client;
    }

    async createOauthClient(redirectUri: string, scopes: string[], name: string, ownerTypoId: number, audience: string): Promise<OAuth2ClientDto> {
        const response = await this.grpcClient.createOauth2Client({
            redirectUri,
            scopes,
            name,
            ownerTypoId,
            audience
        });

        return {
            ...response,
            tokenExpiry: response.tokenExpiry.toNumber()
        };
    }

    async createAuthorizationCode(clientId: number, typoId: number): Promise<OAuth2AuthorizationCodeDto> {
        const response = await this.grpcClient.createOAuth2AuthorizationCode({
            oauth2ClientId: clientId,
            typoId
        });

        return {
            authorizationCode: response.oauth2AuthorizationCode,
            client: {
                ...response.oauth2Client,
                tokenExpiry: response.oauth2Client.tokenExpiry.toNumber()
            }
        };
    }

    async exchangeAuthorizationCode(oauth2AuthorizationCode: string, clientId: number, issuer: string): Promise<string> {
        const response = await this.grpcClient.exchangeOauth2AuthorizationCode({
            oauth2AuthorizationCode,
            oauth2ClientId: clientId,
            jwtIssuer: issuer
        });

        return response.jwt;
    }

    async createAccessToken(typoId: number, clientId: number, issuer: string, audience: string): Promise<string> {
        const response = await this.grpcClient.createOauth2Token({
            typoId,
            oauth2ClientId: clientId,
            requestedAudience: audience,
            jwtIssuer: issuer
        });

        return response.jwt;
    }
}