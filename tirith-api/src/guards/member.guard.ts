/*
https://docs.nestjs.com/guards#guards
*/
import {Request} from 'express';
import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {AuthenticationService} from 'src/services/authentication.service';
import {Reflector} from "@nestjs/core";
import {getRequiredRoles, MembershipEnum} from "../decorators/roles.decorator";

/**
 * A guard that adds an user obejct to the request.
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
    const member = await this.auth.authenticate(token);
    if (!member) throw new HttpException("Could not authenticate user with access token", HttpStatus.UNAUTHORIZED);

    /* define user on request for passport handling */
    Object.defineProperty(request, "user", {
      enumerable: true,
      writable: false,
      value: member,
    });
    return true;
  }
}
