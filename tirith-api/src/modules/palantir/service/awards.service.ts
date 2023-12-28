/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PalantirdbService } from '../../../services/palantirdb.service';
import { AwardDto } from 'src/modules/palantir/dto/awards.dto';
import { IAwardsService } from './awards.service.interface';

@Injectable()
export class AwardsService implements IAwardsService {

    private get database() { return this.databaseService.database; }

    constructor(private databaseService: PalantirdbService) { }

    getAward(id: number): Promise<AwardDto> {
        throw new Error('Method not implemented.');
    }

    async getAllAwards(): Promise<AwardDto[]> {
        const awards = await this.database.getAllAwards();
        return awards.result.map(award => ({
            name: award.Name,
            id: award.ID,
            url: award.URL,
            rarity: award.Rarity,
            description: award.Description
        }));
    }

}
