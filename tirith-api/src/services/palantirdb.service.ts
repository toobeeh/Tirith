/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import PalantirDatabase from 'palantir-db';

@Injectable()
export class PalantirdbService {
    private db: PalantirDatabase;

    public get database() {
        return this.db;
    }

    constructor(private config: ConfigService) {
        this.db = new PalantirDatabase();
        const host = config.get("DB_HOST");
        const user = config.get("DB_USER");
        const pw = config.get("DB_PASSWORD");

        console.log("Connecting as:", host, user, pw);
        this.db.open(user, pw, host);
    }
}
