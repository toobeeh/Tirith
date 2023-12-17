/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { AuthentificationGuard } from 'src/guards/authentification.guard';
import { UpdateDiscordID } from './dto/updateDiscord.dto';
import { MemberGuard } from 'src/guards/member.guard';
import { AuthRoles, RequiredRole, ResourceOwner } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MembersService } from 'src/services/members.service';
import { AccessTokenDto, MemberDto } from './dto/member.dto';
import { MemberSearchDto } from './dto/memberSearch.dto';
import { member } from 'palantir-db/dist/src/types';

@Controller("members")
@ApiTags("members")
@RequiredRole(AuthRoles.Moderator)
@UseGuards(MemberGuard, AuthentificationGuard)
@ApiBearerAuth()
export class MembersController {

    constructor(private service: MembersService) { }

    @Get("search")
    @ApiResponse({ status: 200, type: MemberSearchDto, isArray: true, description: "An array of matching members" })
    async findMembersWildcardSearch(@Query('content') content: string): Promise<MemberSearchDto[]> {
        return this.service.wildcardSearch(content);
    }

    @Get("me")
    @ApiResponse({ status: 200, type: MemberDto, description: "The authenticated member" })
    async getAuthenticatedMember(@Req() request: Request): Promise<MemberDto> {
        const login = Number(((request as any).user as member).member.UserLogin);
        return this.service.getByLogin(login);
    }

    @Get(":login")
    @ResourceOwner("login")
    @ApiResponse({ status: 200, type: MemberDto, description: "The member with specified login" })
    async getMemberByLogin(@Param('login') login: number): Promise<MemberDto> {
        return this.service.getByLogin(login);
    }

    @Get(":login/token")
    @ResourceOwner("login")
    @ApiResponse({ status: 200, type: AccessTokenDto, description: "The access token of a member with this login" })
    async getMemberAccessToken(@Param('login') login: number): Promise<AccessTokenDto> {
        return this.service.getAccessToken(login);
    }

    @Patch(":login/discord")
    @ApiResponse({ status: 200, type: MemberDto, description: "The updated member" })
    async updateMemberDiscordID(@Param('login') login: number, @Body() { id }: UpdateDiscordID): Promise<MemberDto> {
        return this.service.updateDiscordID(login, id);
    }

    @Delete(":login/dropboost")
    @ApiResponse({ status: 204 })
    async clearMemberDropboost(@Param('login') login: number): Promise<void> {
        return this.service.clearDropBoost(login);
    }

    @Get("discord/:id")
    @ApiResponse({ status: 200, type: MemberDto, description: "The member with specified discord id" })
    async getMemberByDiscordID(@Param('id') id: string): Promise<MemberDto> {
        return this.service.getByDiscordID(id);
    }
}
