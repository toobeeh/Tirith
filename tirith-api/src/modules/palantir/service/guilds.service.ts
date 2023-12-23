/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PalantirdbService } from '../../../services/palantirdb.service';
import { discordGuildDetails } from 'palantir-db/dist/src/types';
import { DiscordApiGuildDto, DiscordApiService } from '../../../services/discord-api.service';
import { GuildInviteDto } from 'src/modules/palantir/dto/guilds.dto';
import { map } from 'rxjs';

@Injectable()
export class GuildsService {
    private get database() { return this.databaseService.database; }

    constructor(private databaseService: PalantirdbService, private discordService: DiscordApiService) { }

    private mapToDto(palantirGuild: discordGuildDetails, discordGuild: DiscordApiGuildDto, connectedMembers: number): GuildInviteDto {
        return {
            name: discordGuild.name,
            iconUrl: `https://cdn.discordapp.com/icons/${discordGuild.id}/${discordGuild.icon}.png`,
            connectedMembers: connectedMembers,
            token: palantirGuild.ObserveToken
        }
    }

    async getGuildPreview(token: number): Promise<GuildInviteDto> {
        const guildResult = await this.database.getGuildByToken(token);
        if (!guildResult.success) throw new HttpException("No guild found for this token", HttpStatus.NOT_FOUND);

        const guild = JSON.parse(guildResult.result.Palantir) as discordGuildDetails;

        const connectedMembersResult = await this.database.getGuildConnectedMembers(token);
        if (!connectedMembersResult.success) throw new HttpException("Could not find connected member count", HttpStatus.INTERNAL_SERVER_ERROR);

        const discordInfo = await this.discordService.getGuild(guild.GuildID).pipe(map(data => data.data)).toPromise();

        return this.mapToDto(guild, discordInfo, connectedMembersResult.result);
    }
}
