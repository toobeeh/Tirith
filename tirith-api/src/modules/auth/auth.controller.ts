/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { PalantirdbService } from 'src/services/palantirdb.service';
import { DiscordOauthService } from 'src/services/discord-oauth.service';
import { RegistrationRequest, TokenResponse } from './dto/registration.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { Throttle } from '@nestjs/throttler';
import { getThrottleForDefinition } from 'src/guards/trottleConfigs';

@ApiSecurityNotes()
@Throttle(getThrottleForDefinition("throttleTenPerTenMinutes"))
@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(private db: PalantirdbService, private discordOauth: DiscordOauthService) { }

    /**
     * Get the access token for a discord user
     * @param code the discord oauth authorization code
     * @returns the access token of the user, if one exists
     */
    @Get("token")
    @ApiOperation({ summary: "Get the access token for a discord user with given oauth2 auth code" })
    @ApiResponse({ status: 200, type: TokenResponse, description: "Oauth and token obtained successful" })
    async getAccessToken(@Query("code") code: string): Promise<TokenResponse> {

        /* check if code present */
        if (code === null || code === undefined || code.length === 0) throw new HttpException("No auth code present", HttpStatus.BAD_REQUEST);

        const oauthAccessToken = await this.discordOauth.getAccessToken(code);
        const user = await this.discordOauth.getUser(oauthAccessToken);
        try {
            const accessToken = await this.db.database.getAccessToken(user.id);
            return { ...accessToken.result, userId: user.id, userName: user.username };
        }
        catch {
            throw new HttpException("No user exists for this discord id", HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Create a new palantir account for a discord user
     * @param registration The registration body data
     * @returns Details of the oauth user and the new user
     */
    @Post("register")
    @ApiOperation({ summary: "Create a palantir account for a discord user with given oauth2 auth code" })
    @ApiResponse({ status: 200, type: TokenResponse, description: "Oauth successful and user created" })
    async registerDiscordUser(@Body() { code, connectTypo }: RegistrationRequest): Promise<TokenResponse> {

        /* check if code present */
        if (code === null || code === undefined || code.length === 0) throw new HttpException("No auth code present", HttpStatus.BAD_REQUEST);

        console.log(typeof connectTypo, connectTypo);

        const oauthAccessToken = await this.discordOauth.getAccessToken(code);
        const user = await this.discordOauth.getUser(oauthAccessToken);

        /* check if user exists and if so, return existing access token*/
        try {
            const accessToken = await this.db.database.getAccessToken(user.id);
            return { ...accessToken.result, userId: user.id, userName: user.username };
        }
        catch { }

        const newUser = await this.db.database.createMember(user.id, user.username, connectTypo);
        if (newUser.success === false) throw new HttpException("Could not create user", HttpStatus.INTERNAL_SERVER_ERROR);
        const accessToken = await this.db.database.getAccessToken(user.id);

        return { ...accessToken.result, userId: user.id, userName: user.username };
    }
}
