/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISpritesService } from 'src/modules/palantir/service/sprites.service.interface';
import { SpritesDefinition } from '../proto-compiled/sprites';
import { GrpcBaseService } from './grpc-base.abstract';
import { SpriteDto } from 'src/modules/palantir/dto/sprites.dto';

@Injectable()
export class GrpcSpritesService extends GrpcBaseService<SpritesDefinition> implements ISpritesService {

    constructor(config: ConfigService) {
        super(SpritesDefinition, config);
    }

    getAllSprites(): Promise<SpriteDto[]> {
        throw new Error('Method not implemented.');
    }

    getSprite(id: number): Promise<SpriteDto> {
        throw new Error('Method not implemented.');
    }
}
