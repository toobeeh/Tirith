import * as types from "./types";
import * as schema from "./schema";
import * as mysql2 from "mysql2/promise"
import { OkPacket, RowDataPacket } from "mysql2/typings/mysql/lib/protocol/packets";
import { Reports } from "./schema";
import { reportLobby } from "./types";

const leagueWeight = (s: number) => {
    s = s * 1000;
    if (s < 0) return 0;
    if (s > 1000) return 30;
    return -1.78641975945623 * Math.pow(10, -9) * Math.pow(s, 4) + 0.00000457264006980028 * Math.pow(s, 3) - 0.00397188791256729 * Math.pow(s, 2) + 1.21566760222325 * s;
}

/**
 * Palantir/Typo main db access
 */
export class PalantirDatabase {
    /**
     * The Sqlite3 database pool
     */
    private pool?: mysql2.Pool;

    async open(user: string, password: string, host: string, poolSize: number = 5) {
        this.pool = mysql2.createPool({
            host: host,
            user: user,
            password: password != "" ? password : undefined,
            database: "palantir",
            connectionLimit: poolSize,
            waitForConnections: true,
            queueLimit: 0
        });
    }

    private async getConnection() {
        if (!this.pool) throw new Error("database pool has not been opened yet");
        return await this.pool.getConnection();
    }

    /**
     * Close the db connection
     */
    close() {
        try {
            this.pool?.end();
            this.pool = undefined;
        }
        catch { };
    }

    /**
     * Generates an empty database result
     */
    emptyResult<Type>() {
        let empty: types.dbResult<Type> = {
            success: false,
            result: {} as Type
        }
        return empty;
    }

    async get<TTable>(query: string, values: any[]) {
        let conn = await this.getConnection();
        try {
            let [rows, fields] = await conn.query<Array<TTable & RowDataPacket>>(query, values);
            conn.release();
            return rows;
        }
        catch (e) {
            conn.release();
            throw e;
        }
    }

    async update(query: string, values: any[]) {
        let conn = await this.getConnection();
        try {
            let [results, fields] = await conn.query<OkPacket>(query, values);
            conn.release();
            return results;
        }
        catch (e) {
            conn.release();
            throw e;
        }
    }

    async first<TTable>(query: string, values: any[]) {
        let results = await this.get<TTable>(query, values);
        if (results.length > 0) return results[0];
        else return null;
    }

    /**
     * Get a palantir user by their login
     * @param login The user's login token
     * @returns The palantir user object
     */
    async getUserByLogin(login: number) {
        let result = this.emptyResult<types.member>();
        try {
            let row = await this.first<schema.Members>("SELECT * FROM Members WHERE Login = ?", [login]);
            if (!row) throw new Error("no member found");
            result.result = {
                member: JSON.parse(row.Member),
                bubbles: Number(row.Bubbles),
                sprites: row.Sprites,
                drops: Number(row.Drops),
                flags: row.Flag,
                scenes: row.Scenes ? row.Scenes : "",
                rainbowSprites: row.RainbowSprites ? row.RainbowSprites : "",
                webhooks: []
            }

            /* get weighted league drops */
            let weight = 0;
            let rows = await this.get<schema.PastDrops>(`SELECT LeagueWeight FROM PastDrops WHERE CaughtLobbyPlayerID = ? AND LeagueWeight > 0 AND EventDropID = 0`, [result.result.member.UserID]);
            rows.forEach(row => {
                try {
                    let time = Number(row.LeagueWeight);
                    let weighted = leagueWeight(time / 1000);
                    weight += weighted;
                }
                catch (e) {
                    console.warn("Error calculating drop weight: ", e);
                }
            });
            result.result.drops += Math.floor(weight / 100);

            /* get webhooks */
            for (const guild of result.result.member.Guilds) {
                const guildHooks = await this.getServerWebhooks(guild.GuildID, true);
                result.result.webhooks = result.result.webhooks.concat(...guildHooks.result);
            }

            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    /**
     * Get a palantir user by their associated discord ID
     * @param id The user's discord account id
     * @returns The palantir user object
     */
    async getUserByDiscordID(id: string) {
        let result = this.emptyResult<types.member>();

        try {
            let row = await this.first<schema.Members>("SELECT * FROM Members WHERE JSON_EXTRACT(Member, '$.UserID') = ?", [id]);
            if (!row) throw new Error("no member found");
            const member = await this.getUserByLogin(row.Login);
            result = member;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    /**
     * Updates a palantir user to a new associated discord ID
     * @param currentID The user's currently associated discord account id
     * @param newID The user's newly associated discord account id
     * @returns The palantir user object
     */
    async updateUserDiscordID(currentID: string, newID: string, login: number) {
        let result = this.emptyResult<types.member>();

        try {

            /* get existing with new acc and add drops & bubbles, then delete */
            let existing = await this.first<schema.Members>("SELECT * FROM Members WHERE JSON_EXTRACT(Member, '$.UserID') = ?", [newID]);
            if (existing !== null) {

                const existingLogin = (JSON.parse(existing.Member) as types.member["member"]).UserLogin;

                /* add bubbles and drops */
                await this.update(
                    "UPDATE Members SET Drops = Drops + ?, Bubbles = Bubbles + ? WHERE JSON_EXTRACT(Member, '$.UserID') = ?",
                    [existing.Drops, existing.Bubbles, currentID]
                );

                /* remove old account */
                await this.update(
                    "DELETE FROM Members WHERE JSON_EXTRACT(Member, '$.UserID') = ?", [newID]
                );

                /* remove old bubble traces */
                await this.update(
                    "DELETE FROM BubbleTraces WHERE Login = ?", [existingLogin]
                );
            }

            let updateMmber = await this.update("UPDATE Members SET Member = JSON_SET(Member, '$.UserID', ?) WHERE JSON_EXTRACT(Member, '$.UserID') = ?", [newID, currentID]);
            if (updateMmber.affectedRows < 1) throw new Error("no member to update found");

            await this.update("UPDATE PastDrops SET CaughtLobbyPlayerID = ? WHERE CaughtLobbyPlayerID = ?", [newID, currentID]);

            const member = await this.getUserByLogin(login);
            result = member;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    /**
     * Updates a palantir user member string
     * @param login the target user login
     * @param memberString the json stringified which will replace the current data
     */
    async updateMemberJSON(login: number, memberString: string) {
        let result = this.emptyResult<void>();

        try {
            const update = await this.update(
                "UPDATE Members SET Member = ? WHERE Login = ?",
                [memberString, login]
            );
            if (update.affectedRows != 1) throw new Error("no member updated");
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    /**
     * Get members that match a search string
     * @param content a string that should be contained in the member json
     * @returns all matching members
     */
    async getMembersThatContain(content: string) {
        let result = this.emptyResult<schema.Members[]>();

        try {
            let results = await this.get<schema.Members>("SELECT * FROM Members WHERE Member LIKE ?", [`%${content}%`]);

            result.result = results;
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    /**
     * Get a palantir user login by access token
     * @param accessToken The user's access token
     * @returns The user's login token
     */
    async getLoginFromAccessToken(accessToken: string, silent: boolean) {
        let result = this.emptyResult<types.accessToken>();

        try {
            let row = await this.first<schema.AccessTokens>("SELECT * FROM AccessTokens WHERE AccessToken = ?", [accessToken]);
            if (!row) throw new Error("no token found");
            result.result = {
                accessToken: row.AccessToken,
                login: row.Login,
                createdAt: row.CreatedAt.toString()
            };
            result.success = true;
        }
        catch (e) {
            if (!silent) console.warn("Error in query: ", e);
        }
        return result;
    }

    /**
     * Get a access token for a discord user ID, or create one if none exist
     * @param userId the user's discord user id
     * @returns The user's access token
     */
    async getAccessToken(userId: string) {
        let result = this.emptyResult<{ accessToken: string }>();

        try {
            let token = "";
            let row = await this.first<schema.AccessTokens>(
                `SELECT * FROM AccessTokens WHERE AccessTokens.Login IN (SELECT Login FROM Members WHERE JSON_EXTRACT(Members.Member, '$.UserID') = ?);`
                , [userId]);
            if (!row) {
                let member = await this.first<schema.Members>(
                    `SELECT * FROM \`Members\` WHERE JSON_EXTRACT(Members.Member, '$.UserID') = ?`, [userId]);
                if (!member) token = "";
                else {
                    token = this.randomString();
                    await this.get("DELETE FROM AccessTokens WHERE Login = ?", [member.Login]);
                    await this.get("INSERT INTO AccessTokens (Login, AccessToken) VALUES (?, ?)", [member.Login, token]);
                }
            }
            else {
                token = row.AccessToken;
            }
            result.result = {
                accessToken: token
            };
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }

        if (result.result.accessToken === "") throw new Error("no user for this discord ID");
        return result;
    }

    /**
     * Creates a new palantir member
     * @param userId the user's discord user id
     * @param username the user's discord user name
     * @param typoConnect whether the user wants to connect to the typo server
     * @returns The new member
     */
    async createMember(userId: string, username: string, typoConnect: boolean) {
        let result = this.emptyResult<schema.Members>();

        try {

            let login = 0;

            /* get an unique login */
            do {
                login = Math.floor(Math.random() * 100000000);
                const existing = await this.getUserByLogin(login);
                if (existing.success === true) login = 0;
            }
            while (login === 0);

            const typoGuild = await this.first<schema.Palantiri>("SELECT * FROM Palantiri WHERE JSON_EXTRACT(Palantir, '$.GuildID') = '779435254225698827'", []);
            const parsedGuild = typoGuild ? JSON.parse(typoGuild.Palantir) : undefined;
            console.log(parsedGuild, (typoConnect === true && parsedGuild !== undefined));

            const member: types.memberDiscordDetails = {
                UserLogin: login.toString(),
                UserID: userId,
                UserName: username,
                Guilds: (typoConnect === true && parsedGuild !== undefined) ? [parsedGuild] : []
            };
            const stringifiedMember = JSON.stringify(member);

            await this.get("INSERT INTO Members VALUES(?, ?, 0, '', 0, 0, NULL, NULL, NULL, '', '', NULL, NULL)", [login, stringifiedMember]);
            const newMember = await this.first<schema.Members>("SELECT * FROM Members WHERE Login = ?", [login]);
            if (!newMember) throw new Error("new member with login " + login + " not found");

            result.result = newMember;
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }

        return result;
    }

    private randomString(length: number = 64, keyspace: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'): string {
        if (length < 1) {
            throw new RangeError("Length must be a positive integer");
        }

        const pieces: string[] = [];
        const max: number = keyspace.length - 1;

        for (let i = 0; i < length; i++) {
            const randomIndex: number = Math.floor(Math.random() * (max + 1));
            pieces.push(keyspace.charAt(randomIndex));
        }

        return pieces.join('');
    }

    /**
     * Set the scenes of a palantir user
     * @param accessToken The user's access token
     * @returns An indicator for the query's success
     */
    async setUserScenes(login: number, scenes: string) {
        let result = false;

        try {
            await this.update("UPDATE Members SET Scenes = ? WHERE Login = ?", [scenes, login]);
            result = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    /**
     * Set the sprites of a palantir user
     * @param accessToken The user's access token
     * @returns An indicator for the query's success
     */
    async setUserSprites(login: number, sprites: string) {
        let result = false;

        try {
            await this.update("UPDATE Members SET Sprites = ? WHERE Login = ?", [sprites, login]);
            result = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    /**
     * Gets all active plantir lobbies
     * @returns An array of palantir lobbies
     */
    async getActiveLobbies() {
        let result = this.emptyResult<Array<types.activeGuildLobbies>>();

        try {
            let rows = await this.get<schema.GuildLobbies>(`SELECT CONCAT('"', GuildID, '"') as GuildID, Lobbies FROM GuildLobbies`, []);
            result.result = [];
            rows.forEach(row => {
                try {
                    result.result?.push({
                        guildID: JSON.parse(row.GuildID),
                        guildLobbies: JSON.parse(row.Lobbies)
                    });
                }
                catch (e) {
                    console.warn("Error parsing lobby JSON: ", e);
                }
            });
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    /**
      * Gets public data
      * @returns palantir public data
      */
    async getPublicData() {
        let result = this.emptyResult<types.publicData>();

        try {
            const eventdrops = await this.get<schema.EventDrops>("SELECT * FROM EventDrops LEFT JOIN Events ON EventDrops.EventID = Events.EventID", []);
            // get active sprites
            const onlinesprites = await this.get<schema.OnlineSprites>("SELECT * FROM OnlineSprites WHERE Slot > 0", []);
            // get active scenes
            const onlinescenes = await this.get<schema.OnlineSprites>("SELECT * FROM OnlineSprites WHERE Slot < 0", []);
            // get sprites
            const sprites = await this.get<schema.Sprites>("SELECT * FROM Sprites", []);
            // get scenes
            const scenes = await this.get<schema.Scenes>("SELECT * FROM Scenes", []);

            // get online items
            let now = Math.round(Date.now() / 1000)
            const onlineitems = await this.get<schema.OnlineItems>("SELECT * FROM OnlineItems WHERE Date > " + (now - 25).toString() + "", []);

            result.result = {
                drops: eventdrops.map(d => ({ EventDropID: d.EventDropID, EventID: d.EventID, Name: d.Name, URL: d.URL })),
                onlineSprites: onlinesprites,
                onlineScenes: onlinescenes,
                onlineItems: onlineitems,
                sprites: sprites as Array<types.sprite>,
                scenes: scenes.map(s => { if (!s.GuessedColor) s.GuessedColor = ""; return s as types.scene; })
            };
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    /**
     * Sets the properties of a lobby
     * @param id The id of the lobby
     * @param key The lobby key generated depending on its properties
     * @param description The lobby description for the Palantir bot
     * @param restriction The restriction state (unrestricted/ID/restricted)
     * @returns Indicator if the query succeeded
     */
    async setLobby(id: string, key: string, description: string = "", restriction: string = "") {
        let success = false;
        try {
            await this.update("REPLACE INTO Lobbies VALUES(?,?)", [id, JSON.stringify({ ID: id, Key: key, Description: description, Restriction: restriction })]);
            success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return success;
    }

    /**
      * Gets a lobby either by its id or key
      * @param value The user's access token
      * @returns The palantir lobby
      */
    async getLobby(value: string, indicator: string = "key") {
        let result = this.emptyResult<{ found: boolean, lobby: types.palantirLobby | null }>();
        result.result = { found: false, lobby: null };
        try {
            if (indicator == "key") {
                let rows = await this.get<schema.Lobbies>("SELECT * FROM Lobbies", []);
                // iterate through lobbies and check if lobby kay matches
                for (const row of rows) {
                    let lobby: types.palantirLobby = JSON.parse(row.Lobby);
                    if (lobby.Key == value) {
                        result.result.lobby = lobby;
                        result.result.found = true;
                    }
                }
                result.success = true;
            }
            else if (indicator == "id") {
                let res = await this.first<schema.Lobbies>("SELECT * FROM Lobbies WHERE LobbyID LIKE ?", [value]);
                if (res) {
                    result.result.lobby = JSON.parse(res.Lobby);
                    result.result.found = true;
                }
                result.success = true;
            }
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    /**
     * Writes a lobby report for a player
     * @param lobbies An array of lobby reports, containing the lobby and guild data
     * @returns Indicator if the query succeeded
     */
    async writeReport(lobbies: Array<types.guildLobby>) {
        let success = false;
        try {

            let query = "REPLACE INTO Reports VALUES " + lobbies.map(s => "(?,?,?, CURRENT_TIMESTAMP)").join(", ");
            let params = lobbies.map(lobby => [lobby.ID, lobby.ObserveToken, JSON.stringify(lobby)]).flat();

            await this.update(query, params);
            success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return success;
    }

    /**
      * Write a player's status for a certain session
      * @param status The status object containing status information
      * @param key The session id of the status
      * @returns Indicator if the query succeeded
      */
    async writePlayerStatusBulk(statuses: Array<{ session: string, status: types.playerStatus }>) {
        let success = false;
        try {
            let query = "REPLACE INTO Status VALUES " + statuses.map(s => "(?, ?, CURRENT_TIMESTAMP)").join(", ");
            let params = statuses.map(s => [s.session, JSON.stringify(s.status)]).flat();
            this.update(query, params);
            success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return success;
    }

    /**
     *  Clear volatile data as reports, status, onlinesprites etc
     * @returns Indicator if the query succeeded
     */
    async clearVolatile() {
        let success = false;
        try {
            await this.get("DELETE FROM Reports WHERE Date < DATE_ADD(CURRENT_TIMESTAMP, INTERVAL -30 SECOND)", []);
            await this.get("DELETE FROM Status WHERE Date < DATE_ADD(CURRENT_TIMESTAMP, INTERVAL -10 SECOND)", []);
            await this.get("DELETE FROM OnlineSprites WHERE Date < DATE_ADD(CURRENT_TIMESTAMP, INTERVAL -30 SECOND)", []);
            await this.get("DELETE FROM OnlineItems WHERE FROM_UNIXTIME(Date) < DATE_ADD(CURRENT_TIMESTAMP, INTERVAL -30 SECOND)", []);
            await this.get("DELETE FROM Lobbies WHERE json_extract(Lobby, '$.ID') NOT IN (SELECT DISTINCT json_extract(Status, '$.LobbyID') FROM Status WHERE json_extract(Status, '$.LobbyID') IS NOT NULL) AND FROM_UNIXTIME(LobbyID / 1000) < DATE_ADD(CURRENT_TIMESTAMP, INTERVAL -24 HOUR);", []);

            // delete duplicate keys with different IDs
            let lobbies = await this.get<{ LobbyID: string, LobbyKey: string }>("SELECT LobbyID, json_extract(Lobby, '$.Key') as LobbyKey FROM Lobbies", []);
            lobbies.forEach(async (lobby, index) => {
                if (lobbies.findIndex(unique => lobby.LobbyKey == unique.LobbyKey) != index && lobby.LobbyKey.indexOf("https") < 0) {
                    console.log("dupe found:" + lobby.LobbyKey + lobby.LobbyID);
                    await this.get("DELETE FROM Lobbies WHERE LobbyID = ?", [lobby.LobbyID]);
                }
            });
            success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return success;
    }

    /**
     *  Clear a user's current dropboost
     * @param login the users login
     * @returns Indicator if the query succeeded
     */
    async clearDropboost(login: string) {
        let success = false;
        try {
            await this.get("DELETE FROM DropBoosts WHERE Login = ?", [login]);
            success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return success;
    }

    /**
      * Get a drop by its ID
      * @param id ID of the drop; if -1 the current drop is returned
      * @returns The drop
      */
    async getDrop(id: string = "") {
        let result = this.emptyResult<schema.NextDrop | null>();
        try {
            // get drop
            let drop = id != "" ?
                await this.first<schema.NextDrop>("SELECT * FROM NextDrop WHERE DropID = ?", [id]) :
                await this.first<schema.NextDrop>("SELECT * FROM NextDrop", []);
            result.success = true;
            result.result = drop;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    /**
      * Claim a drop for a user
      * @param lobbyKey Lobby key of the claiming user
      * @param playerName Skribbl name of the claiming user
      * @param dropID ID of the drop to claim, must be valid for successful claim
      * @param userid Discord ID of the claiming user
      * @returns Indicator if the query succeeded
      */
    async claimDrop(lobbyKey: string, playerName: string, dropID: string, userid: string, leagueweight: number, dropOrigin: schema.NextDrop) {
        let success = false;
        try {
            // get drop
            if (leagueweight == 0) this.update("UPDATE NextDrop SET CaughtLobbyKey = ?, CaughtLobbyPlayerID = ? WHERE DropID = ?", [lobbyKey, playerName, dropID]);
            await this.update("INSERT INTO PastDrops VALUES (?, ?, ?, ?, ?, ?)", [dropID, lobbyKey, userid, dropOrigin.ValidFrom, dropOrigin.EventDropID, leagueweight]);
            //this.db.prepare("UPDATE PastDrops SET CaughtLobbyPlayerID = ?, CaughtLobbyKey = ?, LeagueWeight = ? WHERE DropID = ?").run(userid, lobbyKey, leagueweight, dropID);

            // if league drop, free up for next claim
            //if(leagueweight > 0) this.db.prepare("UPDATE 'Drop' SET CaughtLobbyKey = '', CaughtLobbyPlayerID = '' WHERE DropID = ?").run(dropID);

            success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return success;
    }

    /**
      * Reward a drop to a user
      * @param login The login of the player that is being rewarded
      * @param eventdrop ID of the eventdrop, if associated with an event
      * @returns Indicator if the query succeeded
      */
    async rewardDrop(login: string, eventdrop: number) {
        let success = false;
        try {
            // get drop
            if (eventdrop > 0) {
                let result = await this.update("UPDATE EventCredits SET Credit = Credit + 1 WHERE EventDropID = ? AND Login = ?", [eventdrop, login]);
                if (result.changedRows <= 0) await this.get("INSERT INTO EventCredits VALUES(?, ?, 1)", [login, eventdrop]);
            }
            else await this.get("UPDATE Members SET Drops = Drops + 1 WHERE Login = ?", [login]);
            success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return success;
    }

    /**
      * Check if a player is the palantir owner of a lobby
      * @param lobbyID The ID of the target lobby
      * @param lobbyPlayerID The ID of the target player in the skribbl lobby
      * @returns Indicator if the passed id is the owner as well as the actual owner id
      */
    async isPalantirLobbyOwner(lobbyID: string, lobbyPlayerID: number) {
        let result = this.emptyResult<{ owner: boolean | null, ownerID: number | null }>();
        try {
            let lobbyplayers = await this.get<{ playerid: number }>("SELECT json_extract(Status, '$.LobbyPlayerID') as playerid from Status where json_extract(Status, '$.LobbyID') = ?", [lobbyID]);
            result.result.owner = !lobbyplayers.some(player => Number(player.playerid) < lobbyPlayerID);
            if (lobbyplayers.length > 0) result.result.ownerID = lobbyplayers.sort((a, b) => a.playerid - b.playerid)[0].playerid;
            else {

                // if there are no online players for this lobby, user is most likely owner and the status was not yet written 
                result.result.owner = true;
                result.result.ownerID = lobbyPlayerID;
            }

            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    /**
     * Check if a player is the palantir owner of a lobby
     * @param lobbyID The ID of the target lobby
     * @param lobbyPlayerID The ID of the target player in the skribbl lobby
     * @returns Indicator if the passed id is the owner as well as the actual owner id
     */
    async getServerWebhooks(serverID: string, censorURL: boolean = false) {
        let result = this.emptyResult<Array<types.palantirWebhook>>();

        try {
            let rows = await this.get<schema.Webhooks>(`SELECT * FROM Webhooks WHERE ServerID = ?`, [serverID]);
            result.result = [];
            rows.forEach(row => {
                try {
                    result.result?.push({
                        ServerID: row.ServerID,
                        Name: row.Name,
                        WebhookURL: censorURL ? ":^)" : row.WebhookURL
                    });
                }
                catch (e) {
                    console.warn("Error adding webhook: ", e);
                }
            });
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    /**
     * gets all current reports
     */
    async getReports() {
        let result = this.emptyResult<Array<types.reportLobby>>();

        try {
            let rows = await this.get<schema.Reports>(`SELECT * FROM Reports`, []);
            result.result = rows.map(r => JSON.parse(r.Report));
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    async getAllActiveLobbies() {
        let result = this.emptyResult<Array<types.palantirLobby>>();

        try {
            let rows = await this.get<any>(`SELECT DISTINCT Lobbies.LobbyID, Lobby FROM Lobbies LEFT JOIN Reports ON Lobbies.LobbyID = Reports.LobbyID WHERE Reports.LobbyID IS NOT NULL;`, []);
            result.result = rows.map(r => JSON.parse(r.Lobby));
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    async getAllStatus() {
        let result = this.emptyResult<Array<types.playerStatus>>();

        try {
            let rows = await this.get<any>(`SELECT * FROM Status;`, []);
            result.result = rows.map(r => JSON.parse(r.Status));
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    async getAllAwards() {
        let result = this.emptyResult<Array<schema.Awards>>();

        try {
            let rows = await this.get<any>(`SELECT * FROM Awards;`, []);
            result.result = rows;
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    async getDropsFromLobby(lobbyKey: string) {
        let result = this.emptyResult<schema.PastDrops[]>();

        try {
            let rows = await this.get<schema.PastDrops>(`SELECT * FROM PastDrops WHERE CaughtLobbyKey = ?;`, [lobbyKey]);
            result.result = rows;
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    async getAllEvents() {
        let result = this.emptyResult<Array<schema.Events>>();

        try {
            let rows = await this.get<schema.Events>(`SELECT * FROM Events;`, []);
            result.result = rows;
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    async getEvent(id: number) {
        let result = this.emptyResult<schema.Events>();

        try {
            let rows = await this.get<schema.Events>(`SELECT * FROM Events WHERE EventID = ?;`, [id]);
            if (rows.length < 1) throw new Error("event " + id + " not found");
            result.result = rows[0];
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    async getAllScenes() {
        let result = this.emptyResult<Array<schema.Scenes>>();

        try {
            let rows = await this.get<schema.Scenes>(`SELECT * FROM Scenes;`, []);
            result.result = rows;
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    async getScene(id: number) {
        let result = this.emptyResult<schema.Scenes>();

        try {
            let rows = await this.get<schema.Scenes>(`SELECT * FROM Scenes WHERE ID = ?;`, [id]);
            if (rows.length < 1) throw new Error("scene not found");
            result.result = rows[0];
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    async getAllSprites() {
        let result = this.emptyResult<Array<schema.Sprites>>();

        try {
            let rows = await this.get<schema.Sprites>(`SELECT * FROM Sprites;`, []);
            result.result = rows;
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    async getSprite(id: number) {
        let result = this.emptyResult<schema.Sprites>();

        try {
            let rows = await this.get<schema.Sprites>(`SELECT * FROM Sprites WHERE ID = ?;`, [id]);
            if (rows.length < 1) throw new Error("sprite not found");
            result.result = rows[0];
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    async getAllEventDrops(eventId?: number) {
        let result = this.emptyResult<Array<schema.EventDrops>>();

        try {
            let rows = eventId !== undefined ?
                await this.get<schema.EventDrops>(`SELECT * FROM EventDrops WHERE EventID = ?;`, [eventId]) :
                await this.get<schema.EventDrops>(`SELECT * FROM EventDrops;`, []);
            result.result = rows;
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    async getEventDrop(id: number) {
        let result = this.emptyResult<schema.EventDrops>();

        try {
            let rows = await this.get<schema.EventDrops>(`SELECT * FROM EventDrops WHERE EventDropID = ?;`, [id]);
            if (rows.length < 1) throw new Error("event drop not found");
            result.result = rows[0];
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }

    async getGuildByToken(token: number) {
        let result = this.emptyResult<schema.Palantiri>();

        try {
            let rows = await this.get<schema.Palantiri>(`SELECT * FROM Palantiri WHERE Token = ?;`, [token]);
            if (rows.length < 1) throw new Error("guild not found");
            result.result = rows[0];
            result.success = true;
        }
        catch (e) {
            console.warn("Error in query: ", e);
        }
        return result;
    }
}

export default PalantirDatabase;