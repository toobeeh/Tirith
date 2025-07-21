import {JwtScopeDto} from "../../modules/auth/dto/jwtParameters.dto";

export const IAuthorizationService = Symbol("IAuthorizationService");

export interface IAuthorizationService {
    createJwt(typoId: number, expiryMs: number, applicationName: string, redirectUri: string, scopes: string[]): Promise<string>;

    createJwtForVerifiedApplication(typoId: number, applicationId: number): Promise<string>;

    getJwtScopes(): Promise<JwtScopeDto[]>;
}