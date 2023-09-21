/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthentificationGuard } from 'src/guards/authentification.guard';
import { PalantirdbService } from 'src/services/palantirdb.service';
import { UpdateDiscordID } from './dto/updateDiscord.dto';
import { MemberGuard } from 'src/guards/member.guard';
import { AuthRoles, RequiredRole } from 'src/decorators/roles.decorator';

@Controller("members")
@RequiredRole(AuthRoles.Admin)
@UseGuards(MemberGuard, AuthentificationGuard)
export class MembersController {

    constructor(private service: PalantirdbService) { }

    @Get("search")
    async wildcardSearch(@Query('content') content: string) {
        const res = await this.service.database.getMembersThatContain(content);
        if (!res.success) throw new HttpException("Search could not be processed", HttpStatus.INTERNAL_SERVER_ERROR);
        return res.result;
    }

    @Get(":login")
    async getByLogin(@Param('login') login: number) {
        const res = await this.service.database.getUserByLogin(login);
        if (!res.success) throw new HttpException("No user for this login", HttpStatus.NOT_FOUND);
        return res.result;
    }

    @Patch(":login/discord")
    async updateDiscordID(@Param('login') login: number, @Body() { id }: UpdateDiscordID) {
        const res = await this.service.database.getUserByLogin(login);
        if (!res.success) throw new HttpException("No user for this login", HttpStatus.NOT_FOUND);

        if (res.result.member.UserID === id) throw new HttpException("The new user ID is the same as the current", HttpStatus.CONFLICT);

        const update = await this.service.database.updateUserDiscordID(res.result.member.UserID, id, login);
        if (!update.success) throw new HttpException("User ID update failed", HttpStatus.INTERNAL_SERVER_ERROR);
        return update.result;
    }

    @Get("discord/:id")
    async getByDiscordID(@Param('id') id: string) {
        const res = await this.service.database.getUserByDiscordID(id);
        if (!res.success) throw new HttpException("No user for this discord id", HttpStatus.NOT_FOUND);
        return res.result.member.UserLogin;
    }
}
