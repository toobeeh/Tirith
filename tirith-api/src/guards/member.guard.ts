/*
https://docs.nestjs.com/guards#guards
*/
import { Request } from 'express';
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthentificationService } from 'src/services/authentification.service';

/**
 * A guard that adds an user obejct to the request.
 * Requests without valid BEARER token are rejected.
 */
@Injectable()
export class MemberGuard implements CanActivate {

  constructor(private auth: AuthentificationService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    /* get the token and reject if not present */
    const token = request.headers["authorization"]?.split(" ")[1] ?? null;
    if (!token) throw new HttpException("No auth token present", HttpStatus.UNAUTHORIZED);

    /* try to get user from token and reject otherwise */
    const user = await this.auth.authenticate(token);
    if (!user) throw new HttpException("No authorized user present", HttpStatus.UNAUTHORIZED);

    /* define user on request for passport handling */
    Object.defineProperty(request, "user", {
      enumerable: true,
      writable: false,
      value: user.result,
    });
    return true;
  }
}
