/*
https://docs.nestjs.com/providers#services
*/

import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import { IMembersService } from './interfaces/members.service.interface';
import {ClientError, Status} from "nice-grpc";
import * as jwt from "jsonwebtoken";
import {CryptoService} from "./crypto.service";
import {MemberDto} from "../modules/palantir/dto/member.dto";

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

export interface authenticatedUser {
    member: MemberDto,
    scopes: string[]
}

@Injectable()
export class AuthenticationService {

    constructor(
        @Inject(IMembersService) private service: IMembersService,
        @Inject(CryptoService) private cryptoService: CryptoService
    ) { }

    async authenticate(token: string): Promise<authenticatedUser> {

        // try to decode jwt
        const payload = jwt.decode(token);

        /* try to use old token TODO deprecated, remove */
        if(payload === null) {
            try {
                const member = await this.service.getByAccessToken(token);
                return {
                    member,
                    scopes: ["*"] // grant wildcard to legacy tokens
                };
            }
            catch (e) {
                if(e instanceof ClientError && e.code == Status.NOT_FOUND) return undefined;
                throw e;
            }
        }

        // check if payload is valid and retrieve user
        try {
            const result = jwt.verify(token, this.cryptoService.publicKey, { algorithms: ['RS256'], ignoreExpiration: false });
            const memberId = Number(result["sub"]);

            const member = await this.service.getByLogin(memberId);
            const scopes = typeof(result["scope"]) === "string" ? [result["scope"]] : Array.isArray(result["scope"]) ? result["scope"] : [];
            return {
                member,
                scopes
            };
        }
        catch (e) {
            throw new UnauthorizedException("Invalid or expired token");
        }
    }

    attachUserToRequest(request: any, user: authenticatedUser): void {

        /* define user on request for passport handling */
        Object.defineProperty(request, "user", {
            enumerable: true,
            writable: false,
            value: user.member,
        });

        /* define scopes on request for passport handling */
        Object.defineProperty(request, "scopes", {
            enumerable: true,
            writable: false,
            value: user.scopes,
        });
    }

    getScopesFromRequest(request: any): string[] {
        return request.scopes || [];
    }

    static parseFlags(flags: number): userFlags {
        const flagArray = ("00000000" + (flags >>> 0).toString(2)).slice(-11).split("")
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
            contentModerator: flagArray[10] == 1,
        });
    }
}
