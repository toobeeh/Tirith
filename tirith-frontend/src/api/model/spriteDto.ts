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
import { EventDropDto } from './eventDropDto';


export interface SpriteDto { 
    /**
     * Sprite name
     */
    name: string;
    /**
     * Sprite unique ID
     */
    id: number;
    /**
     * Sprite url
     */
    url: string;
    eventDrop: EventDropDto;
    /**
     * Flag for rainbow shift
     */
    isRainbowAllowed: boolean;
    /**
     * Flag for special sprite
     */
    isSpecial: boolean;
    /**
     * Sprite artist name
     */
    artist: string;
}

