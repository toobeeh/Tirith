import { ExecutionContext, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from 'express';
import {MemberFlagDto} from "../modules/palantir/dto/member.dto";

export enum TypoScopes {
    spritesWrite = "member.inventory.sprites:write",
    spritesRead = "member.inventory.sprites:read",
    scenesRead = "member.inventory.scenes:read",
    scenesWrite = "member.inventory.scenes:write",
    awardsRead = "member.inventory.awards:read",
    awardsWrite = "member.awards:write",
    cloudRead = "member.cloud:read",
    cloudWrite = "member.cloud:write",
    imagepostWrite = "member.imagepost:write",
    imagepostRead = "member.imagepost:read",
    guildsRead = "member.guilds:read",
    guildsWrite = "member.guilds:write",
    leaguesRead = "member.leagues:read",
    memberRead = "member:read",
    adminWrite = "admin:write",
    emojisWrite = "emojis:write"
}

/**
 * Set the required scopes(s) for the member guard
 * @param param the required scopes a member must have to access this resource
 * @returns a custom decorator
 */
export const RequiredScope = (...param: string[]): MethodDecorator & ClassDecorator => {
    return (target: any, key?: string | symbol, descriptor?: any) => {

        if(param.length === 0) param = ["*"]; // require wildcard scope by default

        // check scope format
        if(!param.every(scope => scope === "*" || scope.includes(":"))) {
            throw new Error("Invalid scope format. Expected 'scope:mode' or '*'");
        }

        /* applied to controller */
        if (!key) {

            /* get methods that are a path in the controller -> endpoint */
            const controllers = Object.getOwnPropertyNames(target.prototype)
                .map(p => ({ target: target.prototype[p], prop: p }))
                .map(t => ({ target: t.target, prop: t.prop, meta: Reflect.getMetadataKeys(t.target) }))
                .filter(t => t.meta.includes("path") && t.meta.includes("method"));

            /* apply to each endpoint */
            controllers.forEach(c => {
                const desc = Object.getOwnPropertyDescriptor(target.prototype, c.prop);
                RequiredScope(...param)(target, c.prop, desc);
            });
        }

        /* applied to single endpoint */
        else if (descriptor.value) {
            target = descriptor.value;

            /* skip if already processsed - decorators apply first for methods */
            if (Reflect.hasMetadata("guardRequiredScope", target)) return;

            SetMetadata("guardRequiredScope", param)(target);
        }
    }
}

/**
 * Get the required scopes for the member guard
 * @param context the execution context of the calling guard
 * @param reflector the reflector instance of the calling guard
 * @returns the required scopes according to the annotation of the method or class
 */
export const getRequiredScopes = (context: ExecutionContext, reflector: Reflector): string[] => {
    let scopes = reflector.get<string[]>('guardRequiredScope', context.getHandler());
    if (scopes === undefined) {
        scopes = ["*"]; // default to wildcard scope if none set
    }
    return scopes;
}