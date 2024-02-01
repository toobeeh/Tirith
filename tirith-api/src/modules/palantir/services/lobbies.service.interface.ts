import { DropDto } from "../dto/drops.dto";
import { LobbiesResponseDto } from "../dto/lobbies.dto";

export const ILobbiesService = Symbol("ILobbiesService");

export interface ILobbiesService {

    /**
     * Gets data of all current lobbies to inspect their state and playing members
     */
    inspectLobbies(): Promise<LobbiesResponseDto[]>

    /**
     * Gets all drops caught of a lobby with given key
     */
    getLobbyDrops(key: string): Promise<DropDto[]>
}