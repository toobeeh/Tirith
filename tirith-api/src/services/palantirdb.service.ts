/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import PalantirDatabase from 'palantir-db';

/**
 * A service that provides a shared database connection (pool) for all that inject it
 */
@Injectable()
export class PalantirdbService {

    /**
     * The database instance
     */
    private db: PalantirDatabase;

    /**
     * get the database instance
     */
    public get database() {
        return this.db;
    }

    /**
     * Construct the database instance
     * @param config the config for the connection
     */
    constructor(config: ConfigService) {
        this.db = new PalantirDatabase();
        const host = config.get("DB_HOST");
        const user = config.get("DB_USER");
        const pw = config.get("DB_PASSWORD");

        console.log(`Connecting as host:"${host}" user:"${user}" pw:"${pw}" `);
        this.db.open(user, pw, host);
    }
}
