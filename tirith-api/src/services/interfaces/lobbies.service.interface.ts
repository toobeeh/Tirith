import {DropDto} from "../../modules/palantir/dto/drops.dto";
import {OnlineLobbyDto} from "../../modules/palantir/dto/lobbies.dto";
import {Long} from "@grpc/proto-loader";

export const ILobbiesService = Symbol("ILobbiesService");

export interface ILobbiesService {

    /**
     * Gets data of all current lobbies to inspect their state and playing members
     */
    getAllLobbies(): Promise<OnlineLobbyDto[]>

    /**
     * Gets all drops caught of a lobby with given key
     */
    getLobbyDrops(key: string): Promise<DropDto[]>

    decryptLobbyLinkToken(token: string): Promise<{link: string, guildId: Long}>;

    encryptLobbyLinkToken(link: string, guildId: string): Promise<string>;
}