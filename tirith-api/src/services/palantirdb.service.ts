/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import PalantirDatabase from 'palantir-db';

@Injectable()
export class PalantirdbService {
    private db: PalantirDatabase;

    public get database() {
        return this.db;
    }

    constructor() {
        this.db = new PalantirDatabase();
        this.db.open("ithil", "", "108.61.190.186");
    }
}
