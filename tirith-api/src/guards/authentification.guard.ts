/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { member } from 'palantir-db/dist/src/types';
import { Observable } from 'rxjs';
import { AuthRoles, getRequiredRole } from 'src/decorators/roles.decorator';
import { AuthentificationService } from 'src/services/authentification.service';

@Injectable()
export class AuthentificationGuard implements CanActivate {

  constructor(private auth: AuthentificationService, private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user: member = context.switchToHttp().getRequest().user;
    const requiredRole = getRequiredRole(context, this.reflector);
    const flags = this.auth.parseFlags(user.flags);
    return requiredRole === AuthRoles.Admin ? flags.moderator || flags.admin : true;
  }
}
