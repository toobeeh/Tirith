import { GuildInviteDto } from "../dto/guilds.dto";
import { GuildDto } from "../dto/member.dto";

export const IGuildsService = Symbol("IGuildsService");

export interface IGuildsService {

    /**
     * Get the preview data to display a server connection invite
     */
    getGuildPreview(token: number): Promise<GuildInviteDto>;


    /**
     * Get the preview data to display a server connection invite
     */
    getGuildConnectionDetails(token: number): Promise<GuildDto>;
}