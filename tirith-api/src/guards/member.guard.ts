/*
https://docs.nestjs.com/guards#guards
*/
import { Request } from 'express';
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthenticationService } from 'src/services/authentication.service';

/**
 * A guard that adds an user obejct to the request.
 * Requests without valid BEARER token are rejected.
 * Enable this on the controller to require auth token for all endpoints,
 * or on endpoints for finer granulation.
 * When combined with RoleGuard, this guard needs to execute first!
 */
@Injectable()
export class MemberGuard implements CanActivate {

  constructor(private auth: AuthenticationService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
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
