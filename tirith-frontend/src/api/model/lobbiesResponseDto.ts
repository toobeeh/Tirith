/**
 * Skribbl Typo API
 * Skribbl typo admin and auth api
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PalantirLobbyPlayerDto } from './palantirLobbyPlayerDto';
import { LobbyDetailsDto } from './lobbyDetailsDto';
import { PalantirLobbyDto } from './palantirLobbyDto';


export interface LobbiesResponseDto { 
    lobby: PalantirLobbyDto;
    details: LobbyDetailsDto;
    /**
     * Lobby palantir players
     */
    players: Array<PalantirLobbyPlayerDto>;
}
