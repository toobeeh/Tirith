/*
https://docs.nestjs.com/guards#guards
*/
import {Request} from 'express';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import {AuthenticationService} from 'src/services/authentication.service';
import {Reflector} from "@nestjs/core";
import {getRequiredRoles, MembershipEnum} from "../decorators/roles.decorator";
import {getRequiredScopes} from "../decorators/scopes.decorator";

/**
 * A guard that adds a user object to the request.
 * Requests without valid BEARER token are rejected, unless explicitly stated otherwise by requiredroles annotation.
 * Enable this on the controller to require auth token for all endpoints,
 * or on endpoints for finer granulation.
 * When combined with RoleGuard, this guard needs to execute first!
 */
@Injectable()
export class MemberGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private reflector: Reflector) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    /* get required role to access resource */
    const requiredRoles = getRequiredRoles(context, this.reflector);

    /* if no membership is required per required roles, skip */
    if(requiredRoles.includes(MembershipEnum.None)) return true;

    const request = context.switchToHttp().getRequest<Request>();

    /* get the token and reject if not present */
    const token = request.headers["authorization"]?.split(" ")[1] ?? null;
    if (!token) throw new HttpException("No auth token present", HttpStatus.UNAUTHORIZED);

    /* try to get user from token and reject otherwise */
    const user = await this.auth.authenticate(token);
    if (!user) throw new HttpException("Could not authenticate user with access token", HttpStatus.UNAUTHORIZED);

    /* check if token scopes match required scopes */
    const requiredScopes = getRequiredScopes(context, this.reflector);
    const hasScopes = requiredScopes.every(required => user.scopes.some(has => this.matchesScope(required, has)));
    if(!hasScopes) throw new UnauthorizedException(`User does not have required scopes: ${requiredScopes.join(", ")}`);

    this.auth.attachUserToRequest(request, user);
    return true;
  }

  private matchesScope(required: string, has: string): boolean {

    // Wildcard handling
    if (has === "*") return true;
    if (required === "*") return false;

    // Validate format
    if (!required.includes(":") || !has.includes(":")) {
      throw new Error("Invalid scope format. Expected 'scope:mode'");
    }

    const [requiredScope, requiredMode] = required.split(":").map(s => s.trim());
    const [hasScope, hasMode] = has.split(":").map(s => s.trim());

    if (!requiredScope || !requiredMode || !hasScope || !hasMode) {
      throw new Error("Invalid scope format. Expected 'scope:mode'");
    }

    const validModes = ["read", "write"];
    if (!validModes.includes(requiredMode) || !validModes.includes(hasMode)) {
      throw new Error("Invalid mode. Expected 'read' or 'write'");
    }

    // Check permission mode
    if (requiredMode === "write" && hasMode !== "write") return false;

    // Check if hasScope is a prefix of requiredScope
    const requiredParts = requiredScope.split(".");
    const hasParts = hasScope.split(".");

    if (hasParts.length > requiredParts.length) return false;

    for (let i = 0; i < hasParts.length; i++) {
      if (requiredParts[i] !== hasParts[i]) return false;
    }

    return true;
  }
}
