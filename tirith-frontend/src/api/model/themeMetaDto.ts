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


export interface ThemeMetaDto { 
    /**
     * Name of the theme creator
     */
    author: string;
    /**
     * Unix epoch ms representing the creation date
     */
    created: number;
    /**
     * Item type
     */
    type: string;
    /**
     * Local item id
     */
    id: number;
    /**
     * Name of the theme
     */
    name: string;
}

