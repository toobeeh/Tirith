/*
https://docs.nestjs.com/providers#services
*/

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { Observable } from 'rxjs';

export interface DiscordApiGuildDto {
    id: string,
    name: string,
    icon: string
}

@Injectable()
export class DiscordApiService {

    private readonly API_BASE = `https://discord.com/api/v10`;

    constructor(private readonly httpService: HttpService, private config: ConfigService) { }

    private getHeaders(): RawAxiosRequestHeaders {
        return {
            "User-Agent": "Discord bot Palantir",
            "Authorization": `Bot ${this.config.getOrThrow("DISCORD_API_TOKEN")}`
        }
    }

    getGuild(id: string): Observable<AxiosResponse<DiscordApiGuildDto>> {
        return this.httpService.get(`${this.API_BASE}/guilds/${id}`, { headers: this.getHeaders() });
    }

}
