/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Query } from '@nestjs/common';
import { DiscordOauthService } from 'src/modules/auth/service/discord-oauth.service';
import { RegistrationRequest, TokenResponse } from '../dto/registration.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { Throttle } from '@nestjs/throttler';
import { getThrottleForDefinition } from 'src/guards/trottleConfigs';
import { IMembersService } from 'src/services/interfaces/members.service.interface';

@ApiSecurityNotes()
@Throttle(getThrottleForDefinition("throttleTenPerTenMinutes"))
@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(@Inject(IMembersService) private membersService: IMembersService, private discordOauth: DiscordOauthService) { }

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
            const palantirUser = await this.membersService.getByDiscordID(user.id);
            const palantirAccessToken = await this.membersService.getAccessToken(Number(palantirUser.userLogin));
            return { accessToken: palantirAccessToken.Token, userId: user.id, userName: user.username };
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

        const oauthAccessToken = await this.discordOauth.getAccessToken(code);
        const user = await this.discordOauth.getUser(oauthAccessToken);

        /* check if user exists and if so, return existing access token*/
        try {
            const palantirUser = await this.membersService.getByDiscordID(user.id);
            const palantirAccessToken = await this.membersService.getAccessToken(Number(palantirUser.userLogin));
            return { accessToken: palantirAccessToken.Token, userId: user.id, userName: user.username };
        }
        catch { }

        const newUser = await this.membersService.createMember(user.id, user.username, connectTypo);
        const accessToken = await this.membersService.getAccessToken(Number(newUser.userLogin));

        return { accessToken: accessToken.Token, userId: user.id, userName: user.username };
    }
}
