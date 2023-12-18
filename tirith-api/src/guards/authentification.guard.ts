/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { member } from 'palantir-db/dist/src/types';
import { Observable } from 'rxjs';
import { AuthRoles, getRequiredRole, getResourceOwner } from 'src/decorators/roles.decorator';
import { AuthentificationService } from 'src/services/authentification.service';

@Injectable()
export class AuthentificationGuard implements CanActivate {

  constructor(private auth: AuthentificationService, private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    /* get required role to access resource */
    const requiredRole = getRequiredRole(context, this.reflector);

    /* if no role required, grant */
    if (requiredRole === AuthRoles.None) return true;

    /* get user from request, requires member guard in order before */
    const user: member = context.switchToHttp().getRequest().user;

    /* check if user accesses its own resource */
    const resourceOwner = getResourceOwner(context, this.reflector);
    if (user.member.UserLogin === resourceOwner?.toString()) return true;

    /* get user flags and check if they match the required role */
    const flags = this.auth.parseFlags(user.flags);
    return requiredRole === AuthRoles.Admin ? flags.admin :
      requiredRole === AuthRoles.Moderator ? flags.moderator || flags.moderator : true;
  }
}
