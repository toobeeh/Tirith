/*
https://docs.nestjs.com/providers#services
*/

import {Inject, Injectable} from '@nestjs/common';
import { IMembersService } from './interfaces/members.service.interface';
import {ClientError, Status} from "nice-grpc";

export interface userFlags {
    bubbleFarming: boolean;
    admin: boolean;
    moderator: boolean;
    contentModerator: boolean;
    unlimitedCloud: boolean;
    patron: boolean;
    permaBan: boolean;
    dropBan: boolean;
    patronizer: boolean;
    booster: boolean;
}

@Injectable()
export class AuthenticationService {

    constructor(@Inject(IMembersService) private service: IMembersService) { }

    async authenticate(token: string) {
        try {
            const member = await this.service.getByAccessToken(token);
            return member;
        }
        catch (e) {
            if(e instanceof ClientError && e.code == Status.NOT_FOUND) return undefined;
            throw e;
        }
    }

    static parseFlags(flags: number): userFlags {
        const flagArray = ("00000000" + (flags >>> 0).toString(2)).slice(-10).split("")
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
            contentModerator: flagArray[9] == 1,
        });
    }
}
