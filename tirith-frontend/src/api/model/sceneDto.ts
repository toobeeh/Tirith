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
import { EventDto } from './eventDto';


export interface SceneDto { 
    /**
     * Scene name
     */
    name: string;
    /**
     * Scene unique ID
     */
    id: number;
    /**
     * Scene url
     */
    url: string;
    /**
     * Scene exclusiveness flag, cant be bought regulary or as event scene
     */
    exclusive: boolean;
    event?: EventDto;
    /**
     * Primary text color
     */
    primaryColor?: string;
    /**
     * Guessed text color
     */
    guessedColor?: string;
    /**
     * Scene artist name
     */
    artist?: string;
}

