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
import { GuildDto } from './guildDto';


export interface MemberDto { 
    /**
     * The member\'s plain bubbles
     */
    bubbles: number;
    /**
     * The member\'s regular drops
     */
    drops: number;
    /**
     * The member\'s sprite inventory
     */
    sprites: string;
    /**
     * The member\'s scene inventory
     */
    scenes: string;
    /**
     * The member\'s flag config
     */
    flags: number;
    /**
     * The member\'s rainbow sprite config
     */
    rainbowSprites: string;
    /**
     * The member\'s connected discord account id
     */
    discordID: string;
    /**
     * The member\'s palantir accunt user name
     */
    userName: string;
    /**
     * The member\'s palantir identification
     */
    userLogin: string;
    /**
     * The member\'s palantir identification
     */
    guilds: Array<GuildDto>;
    /**
     * The raw database member result
     */
    rawMember: object;
}
