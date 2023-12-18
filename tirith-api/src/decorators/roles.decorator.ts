import { ExecutionContext, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from 'express';

/**
 * Enum with possible authentification levels
 */
export enum AuthRoles {
    Admin = "Administrator",
    Moderator = "Moderator",
    Member = "Member",
    None = "None"
}

/**
 * Set the required role for the authentification guard
 * @param param the required role a member must have to access this resource
 * @returns a custom decorator
 */
export const RequiredRole = (param: AuthRoles) => SetMetadata('guardRequiredRole', param);

/**
 * Get the required role for the authentification guard
 * @param context the execution context of the calling guard
 * @param reflector the reflextor isntance of the calling guard
 * @returns the required role according to the annotation of the method or class
 */
export const getRequiredRole = (context: ExecutionContext, reflector: Reflector) => {
    let role = reflector.get<AuthRoles>('guardRequiredRole', context.getHandler());
    if (role === undefined) {
        role = reflector.get<AuthRoles>('guardRequiredRole', context.getClass());
        if (role === undefined) throw new Error("no auth annotation present");
    }
    return role;
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