import {GuildInviteDto} from "../../modules/palantir/dto/guilds.dto";
import {GuildDto, WebhookDto} from "../../modules/palantir/dto/member.dto";

export const IGuildsService = Symbol("IGuildsService");

export interface IGuildsService {

    /**
     * Get the preview data to display a server connection invite
     */
    getGuildPreview(invite: number): Promise<GuildInviteDto>;


    /**
     * Get the preview data to display a server connection invite
     */
    getGuildByInvite(invite: number): Promise<GuildDto>;

    getGuildWebhooks(guild: GuildDto): Promise<WebhookDto[]>;

    guildInviteEnabled(id: string): Promise<boolean>;
}