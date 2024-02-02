import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GrpcBaseService } from "./grpc-base";
import { GuildReply, GuildsDefinition } from "../proto-compiled/guilds";
import { IGuildsService } from "src/services/interfaces/guilds.service.interface";
import { GuildInviteDto } from "src/modules/palantir/dto/guilds.dto";
import { GuildDto } from "src/modules/palantir/dto/member.dto";
import { DiscordApiService } from "src/services/discord-api.service";
import { map } from "rxjs";

@Injectable()
export class GrpcGuildsService extends GrpcBaseService<GuildsDefinition> implements IGuildsService {

    constructor(config: ConfigService, private discordApiService: DiscordApiService) {
        super(GuildsDefinition, config);
    }

    async mapGuildInviteDto(reply: GuildReply): Promise<GuildInviteDto> {
        const discordGuild = await this.discordApiService.getGuild(reply.guildId.toString()).pipe(map(data => data.data)).toPromise();

        return {
            name: reply.name,
            iconUrl: `https://cdn.discordapp.com/icons/${discordGuild.id}/${discordGuild.icon}.png`,
            connectedMembers: reply.connectedMemberCount,
            token: reply.observeToken
        }
    }

    mapGuildDto(reply: GuildReply): GuildDto {
        return {
            GuildName: reply.name,
            ObserveToken: reply.observeToken,
            GuildID: reply.guildId.toString(),
            ChannelID: reply.channelId.toString(),
            MessageID: reply.messageId.toString(),
            Webhooks: [] // TODO this should be deprecated
        }
    }

    async getGuildPreview(token: number): Promise<GuildInviteDto> {
        const guild = await this.grpcClient.getGuildByToken({ observeToken: token });
        const mappedGuild = await this.mapGuildInviteDto(guild);
        return mappedGuild;
    }

    async getGuildConnectionDetails(token: number): Promise<GuildDto> {
        const guild = await this.grpcClient.getGuildByToken({ observeToken: token });
        const mappedGuild = this.mapGuildDto(guild);
        return mappedGuild;
    }
}