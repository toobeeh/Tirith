/*
https://docs.nestjs.com/controllers#controllers
*/

import {BadRequestException, Body, Controller, Get, Inject, Param, Post, UseGuards} from '@nestjs/common';
import {DiscordOauthService} from 'src/modules/auth/service/discord-oauth.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ApiSecurityNotes} from 'src/decorators/apiSecurityNote.decorator';
import {Throttle} from '@nestjs/throttler';
import {getThrottleForDefinition} from 'src/guards/trottleConfigs';
import {IMembersService} from 'src/services/interfaces/members.service.interface';
import {IAuthorizationService} from "../../../services/interfaces/authorization.service.interface";
import {OAuth2AuthenticationDto} from "../dto/oauth2Authentication.dto";
import {MemberDto} from "../../palantir/dto/member.dto";
import {OAuth2TokenExchangeDto} from "../dto/oauth2TokenExchangeDto";
import {OAuth2AccessTokenResponseDto} from "../dto/oauth2AccessTokenResponse.dto";
import {ScopeDto} from "../dto/scope.dto";
import {PreauthenticateDiscordOauth2CodeDto} from "../dto/preauthenticateDiscordOauth2CodeDto";
import {DiscordAuthenticationResultDto} from "../dto/discordAuthenticationResult.dto";
import {CreateOAuth2ClientDto, OAuth2ClientDto} from "../dto/oauth2Client.dto";
import {MemberGuard} from "../../../guards/member.guard";
import {LoginTokenParamDto} from "../../palantir/dto/params.dto";
import {MembershipEnum, RequiredRole, ResourceOwner} from "../../../decorators/roles.decorator";
import {OAuth2AuthenticationResultDto} from "../dto/oauth2AuthenticationResult.dto";
import {CryptoService} from "../../../services/crypto.service";
import {RoleGuard} from "../../../guards/role.guard";
import {OpenIdService} from "../service/openid.service";

@ApiSecurityNotes()
@Throttle(getThrottleForDefinition("throttleTenPerMinute"))
@Controller("oauth2")
@ApiTags("oauth2")
export class OAuth2Controller {
    constructor(
        @Inject(IMembersService) private membersService: IMembersService,
        @Inject(IAuthorizationService) private authService: IAuthorizationService,
        @Inject(CryptoService) private cryptoService: CryptoService,
        private discordOauth: DiscordOauthService,
        private openidService: OpenIdService
    ) { }

    @Get("scopes")
    @ApiOperation({ summary: "Get all available scopes for OAuth2" })
    @ApiResponse({ status: 200, type: ScopeDto, isArray: true, description: "List of available scopes" })
    async getScopes(): Promise<ScopeDto[]> {
        return this.authService.getScopes();
    }

    @Post("preauthenticate")
    @ApiOperation({ summary: "Retrieve details about a discord user using a discord auth code and an access token for later use" })
    @ApiResponse({ status: 200, type: DiscordAuthenticationResultDto, description: "Discord user authenticated successfully" })
    async preAuthenticateDiscordAuthorizationCode(@Body() {authorizationCode}: PreauthenticateDiscordOauth2CodeDto): Promise<DiscordAuthenticationResultDto> {

        // get discord access token & discord user for the requesting user
        const discordOauthAccessToken = await this.discordOauth.getAccessTokenForTypoOauth(authorizationCode);
        const discordUser = await this.discordOauth.getUser(discordOauthAccessToken);
        const encryptedAccessToken = this.cryptoService.encrypt(discordOauthAccessToken);

        // check if the user has a typo account
        let hasTypoAccount: boolean;
        try {
            await this.membersService.getByDiscordID(discordUser.id);
            hasTypoAccount = true;
        } catch (e) {
            hasTypoAccount = false;
        }

        return {
            encryptedAccessToken,
            hasTypoAccount
        }
    }

    @Post("code")
    @ApiOperation({ summary: "Authenticate a typo member using preauthenticated discord details and create a OAuth2 auth code for typo. Creates an account, if set and not existing." })
    @ApiResponse({ status: 200, type: OAuth2AuthenticationResultDto, description: "User authenticated successfully and authorization code issued" })
    async authenticate(@Body() authentication: OAuth2AuthenticationDto): Promise<OAuth2AuthenticationResultDto> {

        // decrypt preauthenticated access token and discord user
        const discordOauthAccessToken = this.cryptoService.decrypt(authentication.discordEncryptedAccessToken);
        const discordUser = await this.discordOauth.getUser(discordOauthAccessToken);

        // get the typo member based of the discord user id
        let member: MemberDto;
        try {
            member = await this.membersService.getByDiscordID(discordUser.id);

            // if user exists, but create params set, throw
            if(authentication.createAccountOptions){
                throw new BadRequestException("User already exists, but create account options were set. Cannot create account for existing user.");
            }
        }
        catch (e) {
            if(authentication.createAccountOptions === undefined) {
                throw new BadRequestException("User does not exist, but no create account options were set.");
            }

            // user does not exist, create a new one
            member = await this.membersService.createMember(discordUser.id, discordUser.username, authentication.createAccountOptions.connectTypoTestground);
        }

        // issue a new authorization code for the authenticated user and client
        const client = await this.authService.getOauthClientById(authentication.clientId);
        const result = await this.authService.createAuthorizationCode(client.clientId, member.typoId);

        return {result, member};
    }

    @Post("token")
    @ApiOperation({ summary: "Exchange a typo oauth2 authorization code for a access token (jwt)" })
    @ApiResponse({ status: 200, type: OAuth2AccessTokenResponseDto, description: "Issued access token and details" })
    async getAccessToken(@Body() exchange: OAuth2TokenExchangeDto): Promise<OAuth2AccessTokenResponseDto> {

        if(exchange.grant_type === "authorization_code") {

            if(exchange.code === undefined || exchange.client_id === undefined) {
                throw new BadRequestException("Missing required parameters: code and client_id are required for authorization_code grant type.");
            }

            const client = await this.authService.getOauthClientById(exchange.client_id);
            const token = await this.authService.exchangeAuthorizationCode(exchange.code, client.clientId, this.openidService.openIdConfig.issuer);

            return {
                access_token: token,
                token_type: "Bearer",
                expires_in: client.tokenExpiry,
                scope: client.scopes.join(" ")
            };
        }

        else if(exchange.grant_type === "urn:ietf:params:oauth:grant-type:token-exchange"){

            if(exchange.subject_token === undefined || exchange.subject_token_type === undefined || exchange.audience === undefined) {
                throw new BadRequestException("Missing required parameters: subject_token and subject_token_type are required for token-exchange grant type.");
            }

            if(exchange.subject_token_type !== "urn:ietf:params:oauth:token-type:jwt") {
                throw new BadRequestException(`Unsupported subject_token_type: ${exchange.subject_token_type}. Only 'urn:ietf:params:oauth:token-type:jwt' is supported.`);
            }

            const token = this.openidService.verifyJwt(exchange.subject_token, false); // do not validate audience; different audience is expected
            const clientId = Number(token["azp"]);
            if(!Number.isInteger(clientId)) {
                throw new BadRequestException("Invalid token: 'azp' claim is missing or invalid. Need original client id for token exchange authorization");
            }
            const client = await this.authService.getOauthClientById(exchange.client_id);

            const subject = Number(token["sub"]);
            if(!Number.isInteger(subject)) {
                throw new BadRequestException("Invalid token: 'sub' claim is missing or invalid. Need original subject id for token exchange authorization");
            }

            const newToken = await this.authService.createAccessToken(subject, clientId, this.openidService.openIdConfig.issuer, exchange.audience);

            return {
                access_token: newToken,
                token_type: "Bearer",
                issued_token_type: "urn:ietf:params:oauth:token-type:jwt",
                expires_in: client.tokenExpiry,
                scope: client.scopes.join(" ")
            };
        }

        else {
            throw new BadRequestException(`Unsupported grant type: ${exchange.grant_type}`);
        }
    }

    @Get("clients")
    @ApiOperation({ summary: "Get all registered OAuth2 clients" })
    @ApiResponse({ status: 200, type: OAuth2ClientDto, isArray: true, description: "List of registered OAuth2 clients" })
    async getClients(): Promise<OAuth2ClientDto[]> {
        return await this.authService.getOauthClients();
    }

    @Post("clients/member/:login")
    @UseGuards(MemberGuard, RoleGuard)
    @RequiredRole(MembershipEnum.Member)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Register a new OAuth2 client" })
    @ApiResponse({ status: 201, type: OAuth2ClientDto, description: "OAuth2 client registered successfully" })
    async registerClient(@Param() param: LoginTokenParamDto, @Body() client: CreateOAuth2ClientDto): Promise<OAuth2ClientDto> {

        return await this.authService.createOauthClient(client.redirectUri, client.scopes, client.name, param.login, client.audience);
    }

}
