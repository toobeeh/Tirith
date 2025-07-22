/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as DiscordOauth from "discord-oauth2";

@Injectable()
export class DiscordOauthService {

    private oauth: DiscordOauth;
    private oauthForTypoOauth: DiscordOauth;
    private cachedTokens: Map<string, { token: DiscordOauth.TokenRequestResult, creation: number }> = new Map();

    constructor(private config: ConfigService) {

        const clientId = config.get("DISCORD_OAUTH_CLIENT_ID");
        const clientSecret = config.get("DISCORD_OAUTH_CLIENT_SECRET");
        const redirectUri = config.get("DISCORD_OAUTH_REDIRECT");
        const typoOauthRedirectUri = config.get("DISCORD_OAUTH_TYPO_OAUTH_REDIRECT");

        this.oauth = new DiscordOauth({
            clientId,
            clientSecret,
            redirectUri
        });

        this.oauthForTypoOauth = new DiscordOauth({
            clientId,
            clientSecret,
            redirectUri: typoOauthRedirectUri
        });
    }

    private emptyCache() {
        const now = Date.now();
        for (const key in this.cachedTokens.keys) {
            const token = this.cachedTokens.get(key);
            if (now - token.creation > token.token.expires_in) {
                this.cachedTokens.delete(key);
            }
        }
    }

    async getAccessToken(code: string) {

        /* remove expired codes from cache */
        this.emptyCache();

        /* check if token is still cached to be able to re-use authorization codes */
        if (this.cachedTokens.has(code)) {
            return this.cachedTokens.get(code).token.access_token;
        }

        const result = await this.oauth.tokenRequest({
            code,
            grantType: 'authorization_code',
            scope: 'identify'
        });

        this.cachedTokens.set(code, { token: result, creation: Date.now() });

        return result.access_token;
    }

    async getAccessTokenForTypoOauth(code: string) {

        /* remove expired codes from cache */
        this.emptyCache();

        /* check if token is still cached to be able to re-use authorization codes */
        if (this.cachedTokens.has(code)) {
            return this.cachedTokens.get(code).token.access_token;
        }

        const result = await this.oauth.tokenRequest({
            code,
            grantType: 'authorization_code',
            scope: 'identify'
        });

        this.cachedTokens.set(code, { token: result, creation: Date.now() });

        return result.access_token;
    }

    async getUser(accessToken: string) {
        return this.oauth.getUser(accessToken);
    }
}
