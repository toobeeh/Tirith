/*
https://docs.nestjs.com/controllers#controllers
*/

import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    NotFoundException,
    Post
} from '@nestjs/common';
import { DiscordOauthService } from 'src/modules/auth/service/discord-oauth.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { Throttle } from '@nestjs/throttler';
import { getThrottleForDefinition } from 'src/guards/trottleConfigs';
import { IMembersService } from 'src/services/interfaces/members.service.interface';
import {IAuthorizationService} from "../../../services/interfaces/authorization.service.interface";
import {OAuth2AuthenticationDto} from "../dto/oauth2Authentication.dto";
import {OAuth2AuthorizationCodeDto} from "../dto/oauth2AuthorizationCode.dto";
import {MemberDto} from "../../palantir/dto/member.dto";
import {OAuth2AuthorizationCodeExchangeDto} from "../dto/oauth2AuthorizationCodeExchange.dto";
import {OAuth2AccessTokenResponseDto} from "../dto/oauth2AccessTokenResponse.dto";
import {ScopeDto} from "../dto/scope.dto";

@ApiSecurityNotes()
@Throttle(getThrottleForDefinition("throttleTenPerMinute"))
@Controller("oauth2")
@ApiTags("oauth2")
export class OAuth2Controller {
    constructor(
        @Inject(IMembersService) private membersService: IMembersService,
        @Inject(IAuthorizationService) private authService: IAuthorizationService,
        private discordOauth: DiscordOauthService
    ) { }

    @Get("scopes")
    @ApiOperation({ summary: "Get all available scopes for OAuth2" })
    @ApiResponse({ status: 200, type: ScopeDto, isArray: true, description: "List of available scopes" })
    async getScopes(): Promise<ScopeDto[]> {
        return this.authService.getScopes();
    }

    @Post("authenticate")
    @ApiOperation({ summary: "Authenticate a user using Discord OAuth2 and create a OAuth2 token for typo" })
    @ApiResponse({ status: 200, type: OAuth2AuthorizationCodeDto, description: "User authenticated successfully and authorization code issued" })
    async authenticate(@Body() authentication: OAuth2AuthenticationDto): Promise<OAuth2AuthorizationCodeDto> {

        // get discord access token & discord user for the requesting user
        const discordOauthAccessToken = await this.discordOauth.getAccessToken(authentication.discordAuthorizationCode);
        const discordUser = await this.discordOauth.getUser(discordOauthAccessToken);

        // get the typo member based of the discord user id
        let member: MemberDto;
        try {
            member = await this.membersService.getByDiscordID(discordUser.id);
        }
        catch (e) {
            throw new NotFoundException("No user exists for this discord id");
        }

        // issue a new authorization code for the authenticated user and client
        const client = await this.authService.getOauthClientById(authentication.clientId);
        const token = await this.authService.createAuthorizationCode(client.clientId, member.typoId);

        return token;
    }

    @Post("token")
    @ApiOperation({ summary: "Exchange a typo oauth2 authorization code for a access token (jwt)" })
    @ApiResponse({ status: 200, type: OAuth2AuthorizationCodeDto, description: "Issued access token and details" })
    async getAccessToken(@Body() exchange: OAuth2AuthorizationCodeExchangeDto): Promise<OAuth2AccessTokenResponseDto> {

        if(exchange.grant_type !== "authorization_code") {
            throw new BadRequestException("Invalid grant type. Only 'authorization_code' is supported.");
        }

        const client = await this.authService.getOauthClientById(exchange.client_id);
        const token = await this.authService.exchangeAuthorizationCode(exchange.code, client.clientId);

        return {
            access_token: token,
            token_type: "Bearer",
            expires_in: client.tokenExpiry,
            scope: client.scopes.join(" ")
        };
    }

}
