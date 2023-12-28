/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISpritesService } from 'src/modules/palantir/service/sprites.service.interface';
import { SpriteReply, SpritesDefinition } from '../proto-compiled/sprites';
import { GrpcBaseService } from './grpc-base.abstract';
import { SpriteDto } from 'src/modules/palantir/dto/sprites.dto';
import { DtoCache } from 'src/utils/dtoCache';
import { EventDropDto } from 'src/modules/palantir/dto/events.dto';
import { IEventsService } from 'src/modules/palantir/service/events.service.interface';

@Injectable()
export class GrpcSpritesService extends GrpcBaseService<SpritesDefinition> implements ISpritesService {

    private eventDropCache = new DtoCache<EventDropDto, number>(s => s.id, 60 * 1000);

    constructor(config: ConfigService, @Inject(IEventsService) private eventsService: IEventsService) {
        super(SpritesDefinition, config);
    }

    private async spriteReplyToDto(reply: SpriteReply): Promise<SpriteDto> {
        const eventDrop = reply.eventDropId ? await this.eventDropCache.getOrFetch(
            reply.eventDropId,
            () => this.eventsService.getEventDrop(reply.eventDropId)
        ) : undefined;

        return {
            ...reply,
            isRainbowAllowed: reply.isRainbow,
            eventDrop
        };
    }

    async getAllSprites(): Promise<SpriteDto[]> {
        const sprites = await this.collectFromAsyncIterable(this.grpcClient.getAllSprites({}));
        return Promise.all(
            sprites.map(t => this.spriteReplyToDto(t))
        );
    }

    async getSprite(id: number): Promise<SpriteDto> {
        const sprite = await this.grpcClient.getSpriteById({ id });
        return this.spriteReplyToDto(sprite);
    }
}
