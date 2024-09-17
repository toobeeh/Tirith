/*
https://docs.nestjs.com/providers#services
*/

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { Observable } from 'rxjs';
import * as FormData from "form-data";

export interface DiscordApiGuildDto {
    id: string,
    name: string,
    icon: string
}

export interface DiscordPostWebhookDto {
    content?: string | undefined;
    username?: string | undefined;
    avatar_url?: string | undefined;
    embeds?: {
        title?: string | undefined,
        description?: string | undefined;
        image?: {
            url?: string | undefined;
        } | undefined;
        timestamp?: string | undefined;
        color?: number | undefined; // 4368373
        footer?: {
            text?: string | undefined;
            icon_url?: string | undefined;
        } | undefined;
        author?: {
            name?: string | undefined;
            url?: string | undefined;
            icon_url?: string | undefined;
        } | undefined;
    }[] | undefined;
    attachments?: {
        id: number,
        description?: string | undefined;
        filename: string;
    }[] | undefined;
}

@Injectable()
export class DiscordApiService {

    private readonly API_BASE = `https://discord.com/api/v10`;

    constructor(private readonly httpService: HttpService, private config: ConfigService) { }

    private getBotHeaders(): RawAxiosRequestHeaders {
        return {
            "User-Agent": "Discord bot Palantir",
            "Authorization": `Bot ${this.config.getOrThrow("DISCORD_API_TOKEN")}`
        }
    }

    getGuild(id: string): Observable<AxiosResponse<DiscordApiGuildDto>> {
        return this.httpService.get(`${this.API_BASE}/guilds/${id}`, { headers: this.getBotHeaders() });
    }

    postWebhook(accountName: string, onlyImage: boolean, author: string, postedBy: string, title: string, base64Image: string, webhookUrl: string): Observable<AxiosResponse<void>>{
        const form = new FormData();
        form.append("files[0]", Buffer.from(base64Image, "base64"), { filename: "image.png" });

        const webhook: DiscordPostWebhookDto = onlyImage ? { // webhook payload for only image
            username: accountName === postedBy ? `${accountName}` : `${postedBy} (${accountName})`,
            avatar_url: "https://i.imgur.com/nLyqf1G.gif",
            content: `### ${title}`,
            attachments: [
                {
                    id: 0,
                    description: `Posted by ${accountName}`,
                    filename: "image.png"
                }
            ]
        } : { // webhook payload for image post embed
            username: "Typo Image Post",
            avatar_url: "https://i.imgur.com/nLyqf1G.gif",
            embeds: [
                {
                    title: title,
                    description: `Drawn by **${author}**`,
                    footer: {
                        icon_url: "https://i.imgur.com/c3FXGKA.png",
                        text: accountName === postedBy ? `${accountName}` : `${postedBy} (${accountName})`
                    },
                    timestamp: new Date().toISOString(),
                    image: {
                        url: "attachment://image.png"
                    },
                    color: 4368373
                }
            ],
            attachments: [
                {
                    id: 0,
                    description: `Posted by ${accountName}`,
                    filename: "image.png"
                }
            ]
        };

        form.append("payload_json", JSON.stringify(webhook));
        return this.httpService.post(webhookUrl, form, {... form.getHeaders()});
    }

}
