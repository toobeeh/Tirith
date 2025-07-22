import {ScopeDto} from "../../modules/auth/dto/scope.dto";
import {OAuth2ClientDto} from "../../modules/auth/dto/oauth2Client.dto";
import {OAuth2AuthorizationCodeDto} from "../../modules/auth/dto/oauth2AuthorizationCode.dto";

export const IAuthorizationService = Symbol("IAuthorizationService");

export interface IAuthorizationService {
    getScopes(): Promise<ScopeDto[]>;

    getOauthClients(): Promise<OAuth2ClientDto[]>;

    getOauthClientById(clientId: number): Promise<OAuth2ClientDto>;

    createAuthorizationCode(clientId: number, typoId: number): Promise<OAuth2AuthorizationCodeDto>;

    exchangeAuthorizationCode(oauth2AuthorizationCode: string, clientId: number): Promise<string>;
}