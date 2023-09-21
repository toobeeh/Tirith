/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { PalantirdbService } from 'src/services/palantirdb.service';
import { DiscordOauthService } from 'src/services/discord-oauth.service';
import { Registration, RegistrationResult } from './dto/registration.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller("auth")
export class AuthController {
    constructor(private db: PalantirdbService, private discordOauth: DiscordOauthService) { }

    /**
     * Get the access token for a discord user
     * @param code the discord oauth authorization code
     * @returns the access token of the user, if one exists
     */
    @Get("token")
    async token(@Query("code") code: string) {

        /* check if code present */
        if (code === null || code === undefined || code.length === 0) throw new HttpException("No auth code present", HttpStatus.BAD_REQUEST);

        const oauthAccessToken = await this.discordOauth.getAccessToken(code);
        const user = await this.discordOauth.getUser(oauthAccessToken);
        try {
            const accessToken = await this.db.database.getAccessToken(user.id);
            return { ...accessToken.result, user };
        }
        catch {
            throw new HttpException("No user exists for this discord id", HttpStatus.NOT_FOUND);
        }
    }

    @Post("register")
    @ApiResponse({ status: 200, type: RegistrationResult })
    async register(@Body() { code, connectTypo }: Registration): Promise<RegistrationResult> {

        /* check if code present */
        if (code === null || code === undefined || code.length === 0) throw new HttpException("No auth code present", HttpStatus.BAD_REQUEST);

        console.log(typeof connectTypo, connectTypo);

        const oauthAccessToken = await this.discordOauth.getAccessToken(code);
        const user = await this.discordOauth.getUser(oauthAccessToken);

        /* check if user exists and if so, return existing access token*/
        try {
            const accessToken = await this.db.database.getAccessToken(user.id);
            return { ...accessToken.result, user };
        }
        catch { }

        const newUser = await this.db.database.createMember(user.id, user.username, connectTypo);
        if (newUser.success === false) throw new HttpException("Could not create user", HttpStatus.INTERNAL_SERVER_ERROR);
        const accessToken = await this.db.database.getAccessToken(user.id);

        return { ...accessToken.result, user, member: newUser.result };
    }
}
