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


export interface CloudUploadDto { 
    /**
     * Image name
     */
    name: string;
    /**
     * Image author name
     */
    author: string;
    /**
     * Whether the image was created in a private lobby
     */
    inPrivate: boolean;
    /**
     * If the image author is the cloud owner
     */
    isOwn: boolean;
    /**
     * Lobby language where the image was created
     */
    language: string;
    /**
     * Commands of the image for skribbl recreation
     */
    commands: Array<object>;
    /**
     * base64 representation of the image
     */
    imageBase64: string;
}
