export const IAuthorizationService = Symbol("IAuthorizationService");

export interface IAuthorizationService {
    createJwt(typoId: number, expiryMs: number, applicationName: string, redirectUri: string, scopes: string[]): Promise<string>;
}