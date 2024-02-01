/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthRoles, getRequiredRole, getResourceOwner } from 'src/decorators/roles.decorator';
import { MemberDto } from 'src/modules/palantir/dto/member.dto';
import { AuthentificationService } from 'src/services/authentification.service';

/**
 * A guard that checks role requrirements and rejcets users that do not fulfill the requirement.
 * Requires the user to be present in the request (via memberguard), else 
 * all requests that do not only requrie AuthRole.None are rejected.
 * Enable this on the controller to enable role checks for all endpoints.
 */
@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthentificationService, private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    /* get required role to access resource */
    const requiredRole = getRequiredRole(context, this.reflector);

    /* if no role required, grant */
    if (requiredRole === AuthRoles.None) return true;

    /* get user from request, requires member guard in order before */
    const member: MemberDto = context.switchToHttp().getRequest().user;

    /* if no user present, reject */
    if (!member) return false;

    /* check if user accesses its own resource */
    const resourceOwner = getResourceOwner(context, this.reflector);
    if (member.userLogin === resourceOwner?.toString()) return true;

    /* get user flags and check if they match the required role */
    const flags = this.auth.parseFlags(member.flags);
    return requiredRole === AuthRoles.Administrator ? flags.admin :
      requiredRole === AuthRoles.Moderator ? flags.moderator || flags.moderator : true;
  }
}
