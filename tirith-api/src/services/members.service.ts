/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PalantirdbService } from './palantirdb.service';
import { member } from 'palantir-db/dist/src/types';
import { AccessTokenDto, MemberDto } from 'src/modules/palantir/dto/member.dto';
import { MemberSearchDto } from 'src/modules/palantir/dto/memberSearch.dto';

@Injectable()
export class MembersService {

    private get database() { return this.databaseService.database; }

    constructor(private databaseService: PalantirdbService) { }

    private mapDatabaseMember(member: member): MemberDto {
        return {
            rawMember: member,
            discordID: member.member.UserID,
            userLogin: member.member.UserLogin,
            userName: member.member.UserName,
            ...member,
            guilds: member.member.Guilds
        };
    }

    /**
     * Searches for all members that contain a given string
     * @param content the string to search for
     * @returns matching members
     */
    async wildcardSearch(content: string): Promise<MemberSearchDto[]> {
        const res = await this.database.getMembersThatContain(content);
        if (!res.success) throw new HttpException("Search could not be processed", HttpStatus.INTERNAL_SERVER_ERROR);

        return res.result.map(item => {
            const mem = JSON.parse(item.Member);
            const res: MemberSearchDto = {
                userLogin: item.Login.toString(),
                userName: mem.UserName,
                rawMember: item
            };
            return res;
        })
    }

    /**
     * Gets a member by login
     * @param login the member login
     * @returns the found member
     */
    async getByLogin(login: number): Promise<MemberDto> {
        const res = await this.database.getUserByLogin(login);
        if (!res.success) throw new HttpException("No user for this login", HttpStatus.NOT_FOUND);
        return this.mapDatabaseMember(res.result);
    }

    /**
     * Gets a member by discord id
     * @param id the linked discord account id
     * @returns the found member
     */
    async getByDiscordID(id: string): Promise<MemberDto> {
        const res = await this.database.getUserByDiscordID(id);
        if (!res.success) throw new HttpException("No user for this discord id", HttpStatus.NOT_FOUND);
        return this.mapDatabaseMember(res.result);
    }

    /**
     * Udpates the linked discord account of a member
     * @param login the member login
     * @param newID the new member discord id
     * @returns the updated member
     */
    async updateDiscordID(login: number, newID: string): Promise<MemberDto> {
        const res = await this.database.getUserByLogin(login);
        if (!res.success) throw new HttpException("No user for this login", HttpStatus.NOT_FOUND);

        if (res.result.member.UserID === newID) throw new HttpException("The new user ID is the same as the current", HttpStatus.CONFLICT);

        const update = await this.database.updateUserDiscordID(res.result.member.UserID, newID, login);
        if (!update.success) throw new HttpException("User ID update failed", HttpStatus.INTERNAL_SERVER_ERROR);
        return this.mapDatabaseMember(update.result);
    }

    /**
     * Udpates the linked discord account of a member
     * @param login the member login
     * @param newID the new member discord id
     * @returns the updated member
     */
    async clearDropBoost(login: number): Promise<void> {
        const res = await this.database.clearDropboost(login.toString());
        if (!res) throw new HttpException("Failed to clear dropbost", HttpStatus.BAD_REQUEST);
    }

    /**
     * Removes a connected guild of a member
     * @param login the member login
     * @param guildToken the guild token to be filtered out
     */
    async removeConnectedGuild(login: number, guildToken: number): Promise<void> {
        const user = await this.database.getUserByLogin(login);
        if (!user.success) throw new HttpException("No user for this login", HttpStatus.NOT_FOUND);

        const member = user.result.member;
        member.Guilds = member.Guilds.filter(g => g.ObserveToken != guildToken);
        const memberString = JSON.stringify(member);

        await this.database.updateMemberJSON(login, memberString);
    }

    /**
     * Gets the accesstoken for a user login
     * @param login the member login
     * @returns the user's access token
     */
    async getAccessToken(login: number): Promise<AccessTokenDto> {
        const memberRes = await this.database.getUserByLogin(login);
        if (!memberRes.success) throw new HttpException("No user for this login", HttpStatus.NOT_FOUND);

        const res = await this.database.getAccessToken(memberRes.result.member.UserID);
        return { Token: res.result.accessToken };
    }

}
