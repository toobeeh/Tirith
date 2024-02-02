import { AccessTokenDto, MemberDto } from "../../modules/palantir/dto/member.dto";
import { MemberSearchDto } from "../../modules/palantir/dto/memberSearch.dto";

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
     * Gets a member by acccess token
     * @param login the member access token
     * @returns the found member
     */
    getByAccessToken(token: string): Promise<MemberDto>;

    /**
     * Gets a member by discord id
     * @param id the linked discord account id
     * @returns the found member
     */
    getByDiscordID(id: string): Promise<MemberDto>;

    /**
     * Updates the linked discord account of a member
     * @param login the member login
     * @param newID the new member discord id
     * @returns the updated member
     */
    updateDiscordID(login: number, newID: string): Promise<MemberDto>;

    /**
     * Creates a new palantir member
     * @param discordId the linked discord id
     * @param username the current discord username
     * @param connectToTypo whether to add the typo server to the initial connections
     * @returns the updated member
     */
    createMember(discordId: string, username: string, connectToTypo: boolean): Promise<MemberDto>;

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