/*
https://docs.nestjs.com/controllers#controllers
*/

import {Controller, Get, Req, Request, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ApiSecurityNotes} from 'src/decorators/apiSecurityNote.decorator';
import {Throttle} from '@nestjs/throttler';
import {getThrottleForDefinition} from 'src/guards/trottleConfigs';
import {JwksDto} from "../dto/jwks.dto";
import {OpenIdConfigurationDto} from "../dto/openIdConfiguration.dto";
import {OpenidService} from "../service/openid.service";
import {OpenIdUserinfoDto} from "../dto/openIdUserinfo.dto";
import {MembershipEnum, RequiredRole} from "../../../decorators/roles.decorator";
import {MemberGuard} from "../../../guards/member.guard";
import {RoleGuard} from "../../../guards/role.guard";
import {MemberDto} from "../../palantir/dto/member.dto";

@ApiSecurityNotes()
@Throttle(getThrottleForDefinition("throttleTenPerMinute"))
@Controller("openid")
@ApiTags("openid")
export class OpenIdController {
    constructor(
        private openidService: OpenidService,
    ) { }

    @Get("jwks.json")
    @ApiOperation({ summary: "Get the JSON Web Key Set (JWKS) for OAuth2" })
    @ApiResponse({ status: 200, type: JwksDto, description: "JSON Web Key Set (JWKS) containing public keys for OAuth2" })
    async getJwks(): Promise<JwksDto> {
        return this.openidService.jwks;
    }

    @Get(".well-known/openid-configuration")
    @ApiOperation({ summary: "Get the openid configuration of typo" })
    @ApiResponse({ status: 200, type: OpenIdConfigurationDto, description: "Minimal openid configuration of typo" })
    async getOpenidConfiguration(): Promise<OpenIdConfigurationDto> {
        return this.openidService.openIdConfig;
    }

    @Get("userinfo")
    @RequiredRole(MembershipEnum.Member)
    @UseGuards(MemberGuard, RoleGuard)
    @ApiOperation({ summary: "Get the userinfo endpoint of typo" })
    @ApiResponse({ status: 200, description: "Userinfo endpoint is available", type: OpenIdUserinfoDto })
    public async getUserinfo(@Req() request: Request): Promise<OpenIdUserinfoDto> {
        const login = Number(((request as any).user as MemberDto).userLogin);

        return {
            sub: login.toString()
        }
    }
}
