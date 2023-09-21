/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthentificationGuard } from 'src/guards/authentification.guard';
import { UpdateDiscordID } from './dto/updateDiscord.dto';
import { MemberGuard } from 'src/guards/member.guard';
import { AuthRoles, RequiredRole } from 'src/decorators/roles.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MembersService } from 'src/services/members.service';
import { MemberDto } from './dto/member.dto';
import { MemberSearchDto } from './dto/memberSearch.dto';

@Controller("members")
@ApiTags("members")
@RequiredRole(AuthRoles.Admin)
@UseGuards(MemberGuard, AuthentificationGuard)
export class MembersController {

    constructor(private service: MembersService) { }

    @Get("search")
    @ApiResponse({ status: 200, type: MemberSearchDto, isArray: true, description: "An array of matching members" })
    async findMembersWildcardSearch(@Query('content') content: string): Promise<MemberSearchDto[]> {
        return this.service.wildcardSearch(content);
    }

    @Get(":login")
    @ApiResponse({ status: 200, type: MemberDto, description: "An array of matching members" })
    async getMemberByLogin(@Param('login') login: number): Promise<MemberDto> {
        return this.service.getByLogin(login);
    }

    @Patch(":login/discord")
    @ApiResponse({ status: 200, type: MemberDto, description: "An array of matching members" })
    async updateMemberDiscordID(@Param('login') login: number, @Body() { id }: UpdateDiscordID): Promise<MemberDto> {
        return this.service.updateDiscordID(login, id);
    }

    @Get("discord/:id")
    @ApiResponse({ status: 200, type: MemberDto, description: "An array of matching members" })
    async getMemberByDiscordID(@Param('id') id: string): Promise<MemberDto> {
        return this.service.getByDiscordID(id);
    }
}
