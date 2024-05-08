import { GuildInviteDto } from "../../modules/palantir/dto/guilds.dto";
import { GuildDto } from "../../modules/palantir/dto/member.dto";

export const IGuildsService = Symbol("IGuildsService");

export interface IGuildsService {

    /**
     * Get the preview data to display a server connection invite
     */
    getGuildPreview(invite: number): Promise<GuildInviteDto>;


    /**
     * Get the preview data to display a server connection invite
     */
    getGuildConnectionDetails(invite: number): Promise<GuildDto>;
}