/**
 * Skribbl Typo API
 * Skribbl Typo API for resources, admin tools and authentification.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { LobbyPlayerDto } from './lobbyPlayerDto';


export interface LobbyDetailsDto { 
    /**
     * The lobby language
     */
    Language: string;
    /**
     * The lobby link
     */
    Link: string;
    /**
     * Indicator if the lobby is private
     */
    Private: boolean;
    /**
     * The lobby\'s current round
     */
    Round: string;
    /**
     * The lobby\'s current round
     */
    Players: Array<LobbyPlayerDto>;
}

