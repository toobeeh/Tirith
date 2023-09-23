/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PalantirdbService } from './palantirdb.service';

@Injectable()
export class DropsService {

    private get database() { return this.databaseService.database; }

    constructor(private databaseService: PalantirdbService) { }

    /**
     * Searches for all members that contain a given string
     * @param content the string to search for
     * @returns matching members
     */
    async getNextDrop(): Promise<string> {
        const res = await this.database.getDrop();
        if (!res.success) throw new HttpException("Search could not be processed", HttpStatus.INTERNAL_SERVER_ERROR);

        return res.result.DropID;
    }

}
