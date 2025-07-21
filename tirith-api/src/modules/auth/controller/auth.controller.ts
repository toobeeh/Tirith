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
import {JwtParametersDto, JwtResponseDto, RegistrationDto} from "../dto/jwtParameters.dto";
import {IAuthorizationService} from "../../../services/interfaces/authorization.service.interface";

@ApiSecurityNotes()
@Throttle(getThrottleForDefinition("throttleTenPerTenMinutes"))
@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(
        @Inject(IMembersService) private membersService: IMembersService,
        @Inject(IAuthorizationService) private authService: IAuthorizationService,
        private discordOauth: DiscordOauthService
    ) { }

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
     * Create a jwt token for a discord authenticated user
     * @param params jwt creation params
     * @returns the access token of the user, if one exists
     */
    @Post("jwt")
    @ApiOperation({ summary: "Create a jwt for a discord user with given oauth2 auth code" })
    @ApiResponse({ status: 200, type: JwtResponseDto, description: "Jwt token created" })
    async getJwt(@Body() params: JwtParametersDto): Promise<JwtResponseDto> {

        const oauthAccessToken = await this.discordOauth.getAccessToken(params.code);
        const user = await this.discordOauth.getUser(oauthAccessToken);
        try {
            const member = await this.membersService.getByDiscordID(user.id);
            const jwt = await this.authService.createJwt(member.typoId, params.expiryMs, params.applicationName, params.redirectUri, params.scopes);
            return { token: jwt, member };
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
    @Post("jwt/register")
    @ApiOperation({ summary: "Create a palantir account for a discord user with given oauth2 auth code" })
    @ApiResponse({ status: 200, type: JwtResponseDto, description: "Oauth successful and user created" })
    async registerDiscordUserCreateJwt(@Body() { connectTypo, params }: RegistrationDto): Promise<JwtResponseDto> {

        const oauthAccessToken = await this.discordOauth.getAccessToken(params.code);
        const user = await this.discordOauth.getUser(oauthAccessToken);

        /* check if user exists and if so, return existing access token*/
        try {
            const member = await this.membersService.getByDiscordID(user.id);
            const jwt = await this.authService.createJwt(member.typoId, params.expiryMs, params.applicationName, params.redirectUri, params.scopes);
            return { token: jwt, member };
        }
        catch { }

        const newMember = await this.membersService.createMember(user.id, user.username, connectTypo);
        const jwt = await this.authService.createJwt(newMember.typoId, params.expiryMs, params.applicationName, params.redirectUri, params.scopes);

        return { token: jwt, member: newMember };
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
