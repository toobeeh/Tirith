/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PalantirdbService } from '../../../services/palantirdb.service';

@Injectable()
export class DropsService {

    private get database() { return this.databaseService.database; }

    constructor(private databaseService: PalantirdbService) { }

    /**
     * Gets the next drop ID
     * @returns id of the next drop
     */
    async getNextDrop(): Promise<number> {
        const res = await this.database.getDrop();
        if (!res.success) throw new HttpException("Could not get next drop", HttpStatus.INTERNAL_SERVER_ERROR);

        return res.result.DropID;
    }
}
