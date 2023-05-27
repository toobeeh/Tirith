/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import PalantirDatabase from 'palantir-db';

@Injectable()
export class AuthentificationService {

    private db: PalantirDatabase;

    constructor(private config: ConfigService) {
        this.db = new PalantirDatabase();
        const host = config.get("DB_HOST");
        const user = config.get("DB_USER");
        const pw = config.get("DB_PASSWORD");
        this.db.open(user, pw, host);
    }

    async authenticate(token: string) {
        try {
            const login = await this.db.getLoginFromAccessToken(token, true);
            const member = await this.db.getUserByLogin(login.result.login);
            return member;
        }
        catch {
            return undefined;
        }
    }

    parseFlags(flags: number) {
        const flagArray = ("00000000" + (flags >>> 0).toString(2)).slice(-8).split("")
            .map(f => Number(f)).reverse();

        // parse array to interface
        return ({
            bubbleFarming: flagArray[0] == 1,
            admin: flagArray[1] == 1,
            moderator: flagArray[2] == 1,
            unlimitedCloud: flagArray[3] == 1,
            patron: flagArray[4] == 1,
            permaBan: flagArray[5] == 1,
            dropBan: flagArray[6] == 1,
            patronizer: flagArray[7] == 1,
            booster: flagArray[8] == 1,
        });
    }
}
