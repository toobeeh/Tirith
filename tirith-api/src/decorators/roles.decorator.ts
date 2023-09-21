import { ExecutionContext, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export enum AuthRoles {
    Admin,
    Member
}

export const RequiredRole = (param: AuthRoles) => SetMetadata('guardRequiredRole', param);

export const getRequiredRole = (context: ExecutionContext, reflector: Reflector) => {
    let role = reflector.get<AuthRoles>('guardRequiredRole', context.getHandler());
    if (role === undefined) {
        role = reflector.get<AuthRoles>('guardRequiredRole', context.getClass());
        if (role === undefined) throw new Error("no auth annotation present");
    }
    return role;
}