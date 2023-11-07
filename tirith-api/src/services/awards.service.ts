/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PalantirdbService } from './palantirdb.service';
import { AwardDto } from 'src/modules/palantir/dto/awards.dto';

@Injectable()
export class AwardsService {

    private get database() { return this.databaseService.database; }

    constructor(private databaseService: PalantirdbService) { }

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
