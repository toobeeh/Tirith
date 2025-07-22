import { ExecutionContext, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from 'express';
import {MemberFlagDto} from "../modules/palantir/dto/member.dto";

export enum MembershipEnum {
    Member = "Member",
    None = "None"
}

/**
 * Enum with possible authentification levels
 */
export type AuthRole = MemberFlagDto | MembershipEnum;

/**
 * Set the required role for the authentification guard
 * If the role is not "None", the annotation for ApiBearerAuth is applied.
 * @param param the required role a member must have to access this resource
 * @returns a custom decorator
 */
export const RequiredRole = (...param: AuthRole[]): MethodDecorator & ClassDecorator => {
    return (target: any, key?: string | symbol, descriptor?: any) => {

        if(param.length === 0) param = [MembershipEnum.None];

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
                RequiredRole(...param)(target, c.prop, desc);
            });
        }

        /* applied to single endpoint */
        else if (descriptor.value) {
            target = descriptor.value;

            /* skip if already processsed - decorators apply first for methods */
            if (Reflect.hasMetadata("guardRequiredRole", target)) return;

            if (!param.includes(MembershipEnum.None)) ApiBearerAuth("Typo OAuth2 Login")(target)
            SetMetadata('guardRequiredRole', param)(target);
        }
    }
}

/**asasd
 * Get the required role for the authentification guard
 * @param context the execution context of the calling guard
 * @param reflector the reflextor isntance of the calling guard
 * @returns the required role according to the annotation of the method or class
 */
export const getRequiredRoles = (context: ExecutionContext, reflector: Reflector): AuthRole[] => {
    let roles = reflector.get<AuthRole[]>('guardRequiredRole', context.getHandler());
    if (roles === undefined) {
        roles = reflector.get<AuthRole[]>('guardRequiredRole', context.getClass());
        if (roles === undefined) return [MembershipEnum.None];
    }
    return roles;
}

/**
 * Identifies the parameter which bypasses the role guard, indicating that 
 * the requesting user is accessing its own resource with full access
 * @param param the path parameter which identifies the user identification
 * @returns a custom decorator
 */
export const ResourceOwner = (paramName: string) => SetMetadata('guardResourceOwner', paramName);

/**
 * Get the user owner identification of the requested resource
 * @param context the execution context of the calling guard
 * @param reflector the reflextor isntance of the calling guard
 * @returns the resource owner id, or undefined if none set
 */
export const getResourceOwner = (context: ExecutionContext, reflector: Reflector) => {
    const paramName = reflector.get<string>('guardResourceOwner', context.getHandler());
    const value = context.switchToHttp().getRequest<Request>().params[paramName];
    const id = Number(value);
    return Number.isInteger(id) ? id : undefined;
}