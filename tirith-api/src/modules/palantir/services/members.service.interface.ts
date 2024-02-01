import { AccessTokenDto, MemberDto } from "../dto/member.dto";
import { MemberSearchDto } from "../dto/memberSearch.dto";

export const IMembersService = Symbol("IMembersService");

export interface IMembersService {

    /**
     * Searches for all members that contain a given string
     * @param content the string to search for
     * @returns matching members
     */
    wildcardSearch(content: string): Promise<MemberSearchDto[]>;

    /**
     * Gets a member by login
     * @param login the member login
     * @returns the found member
     */
    getByLogin(login: number): Promise<MemberDto>;

    /**
     * Gets a member by discord id
     * @param id the linked discord account id
     * @returns the found member
     */
    getByDiscordID(id: string): Promise<MemberDto>;

    /**
     * Udpates the linked discord account of a member
     * @param login the member login
     * @param newID the new member discord id
     * @returns the updated member
     */
    updateDiscordID(login: number, newID: string): Promise<MemberDto>;

    /**
     * Udpates the linked discord account of a member
     * @param login the member login
     * @param newID the new member discord id
     * @returns the updated member
     */
    clearDropBoost(login: number): Promise<void>;

    /**
     * Removes a connected guild of a member
     * @param login the member login
     * @param guildToken the guild token to be filtered out
     */
    removeConnectedGuild(login: number, guildToken: number): Promise<void>;

    /**
     * Adds a guild to the connected guilds of a member
     * @param login the member login
     * @param guildToken the guild token to be added
     */
    connectMemberToGuild(login: number, guildToken: number): Promise<void>;

    /**
     * Gets the accesstoken for a user login
     * @param login the member login
     * @returns the user's access token
     */
    getAccessToken(login: number): Promise<AccessTokenDto>
}