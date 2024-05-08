import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GrpcBaseService } from "./grpc-base";
import { GuildReply, GuildsDefinition } from "../proto-compiled/guilds";
import { IGuildsService } from "src/services/interfaces/guilds.service.interface";
import { GuildInviteDto } from "src/modules/palantir/dto/guilds.dto";
import { GuildDto } from "src/modules/palantir/dto/member.dto";
import {DiscordApiGuildDto, DiscordApiService} from "src/services/discord-api.service";
import { map } from "rxjs";

@Injectable()
export class GrpcGuildsService extends GrpcBaseService<GuildsDefinition> implements IGuildsService {

    constructor(config: ConfigService, private discordApiService: DiscordApiService) {
        super(GuildsDefinition, config);
    }

    async mapGuildInviteDto(reply: GuildReply): Promise<GuildInviteDto> {
        let discordGuild: DiscordApiGuildDto | undefined;
        try {

             discordGuild = await this.discordApiService.getGuild(reply.guildId.toString()).pipe(map(data => data.data)).toPromise();
        }
        catch {
            discordGuild = undefined;
        }

        return {
            name: reply.name,
            iconUrl: `https://cdn.discordapp.com/icons/${discordGuild?.id ?? "not-on-server"}/${discordGuild?.icon ?? "not-on-server"}.png`,
            connectedMembers: reply.connectedMemberCount,
            token: reply.invite
        }
    }

    mapGuildDto(reply: GuildReply): GuildDto {
        return {
            GuildName: reply.name,
            Invite: reply.invite,
            GuildID: reply.guildId.toString()
        }
    }

    async getGuildPreview(invite: number): Promise<GuildInviteDto> {
        const guild = await this.grpcClient.getGuildByInvite({ invite: invite });
        const mappedGuild = await this.mapGuildInviteDto(guild);
        return mappedGuild;
    }

    async getGuildConnectionDetails(invite: number): Promise<GuildDto> {
        const guild = await this.grpcClient.getGuildByInvite({ invite: invite });
        const mappedGuild = this.mapGuildDto(guild);
        return mappedGuild;
    }
}