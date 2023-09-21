/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PalantirdbService } from './palantirdb.service';

@Injectable()
export class LobbiesService {

    private get database() { return this.databaseService.database; }

    constructor(private databaseService: PalantirdbService) { }

    /**
     * Gets all currently active lobbies
     * @returns array of the active lobbies
     */
    async getLobbies() {

        const reports = await this.database.getReports();
        const lobbies = await this.database.getAllActiveLobbies();
        const status = await this.database.getAllStatus();

        if (!(reports.success && lobbies.success && status.success)) throw new HttpException("Failed to load lobbies", HttpStatus.INTERNAL_SERVER_ERROR);

        /* map with players */
        const actives = lobbies.result.map(lobby => {
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
        const mapped = actives.map(l => {
            return {
                lobby: l.lobby,
                details: l.report,
                players: l.players
                    .filter((p, i) => l.players.indexOf(p) == i)
                    .map(id => {
                        const member = status.result
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

    /**
     * Gets all past drops that were caught in a lobby
     * @param key the lobby key
     * @returns array of all matching drops
     */
    async getLobbyDrops(key: string) {
        const drops = await this.database.getDropsFromLobby(key);
        if (!drops.success) throw new HttpException("Failed to get lobby drops", HttpStatus.INTERNAL_SERVER_ERROR);

        return drops.result;
    }

    /**
     * Gets all current lobby reports
     * @returns array of all current lobby reports
     */
    async getLobbyReports() {
        const reports = await this.database.getReports();
        if (!reports.success) throw new HttpException("Failed to get lobby reports", HttpStatus.INTERNAL_SERVER_ERROR);

        return reports.result;
    }

}
