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

        console.log(`Connecting as host:"${host}" user:"${user}" pw:"${pw}" `);
        this.db.open(user, pw, host);
    }

    async getLobbies() {

        const reports = await this.database.getReports();
        const lobbies = await this.database.getAllActiveLobbies();
        const status = await this.database.getAllStatus();

        /* map with players */
        let actives = lobbies.result.map(lobby => {
            return {
                lobby: lobby,
                report: reports.result.find(r => r.ID == lobby.ID),
                players: reports.result
                    .filter(r => r.ID == lobby.ID)
                    .map(r => r.Players
                        .filter(p => p.Sender)
                        .map(p => p.LobbyPlayerID))
                    .flat()
            }
        });

        /* map lobby player ids to player status */
        let mapped = actives.map(l => {
            return {
                ...l,
                players: l.players
                    .filter((p, i) => l.players.indexOf(p) == i)
                    .map(id => {
                        let member = status.result
                            .find(s => s.LobbyID == l.lobby.ID && s.LobbyPlayerID == id.toString());
                        return {
                            name: member?.PlayerMember.UserName,
                            login: member?.PlayerMember.UserLogin,
                            username: l.report.Players.find(p => p.LobbyPlayerID == id)?.Name
                        }
                    })
            }
        });


        return mapped;
    }

    async getLobbyDrops(key: string) {
        const drops = await this.database.getDropsFromLobby(key);
        return drops.result;
    }
}
