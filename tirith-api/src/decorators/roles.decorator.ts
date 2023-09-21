import { ExecutionContext, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

/**
 * Enum with possible authentification levels
 */
export enum AuthRoles {
    Admin,
    Member
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