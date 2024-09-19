/*
https://docs.nestjs.com/guards#guards
*/

import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Observable} from 'rxjs';
import {AuthRoles, getRequiredRoles, getResourceOwner} from 'src/decorators/roles.decorator';
import {MemberDto} from 'src/modules/palantir/dto/member.dto';
import {AuthenticationService} from 'src/services/authentication.service';
import {userFlags} from "tirith-frontend/src/app/shared/services/user-session.service";

/**
 * A guard that checks role requrirements and rejcets users that do not fulfill the requirement.
 * Requires the user to be present in the request (via memberguard), else 
 * all requests that do not only requrie AuthRole.None are rejected.
 * Enable this on the controller to enable role checks for all endpoints.
 */
@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    /* get required role to access resource */
    const requiredRoles = getRequiredRoles(context, this.reflector);

    /* if no role required, grant */
    if (requiredRoles.includes(AuthRoles.None)) return true;

    /* get user from request, requires member guard in order before */
    const member: MemberDto = context.switchToHttp().getRequest().user;

    /* if no user present, reject */
    if (!member) return false;

    /* check if user accesses its own resource */
    const resourceOwner = getResourceOwner(context, this.reflector);
    if (member.userLogin === resourceOwner?.toString()) return true;

    /* get user flags and check if they match one of the required roles */
    const flags = AuthenticationService.parseFlags(member.flags);

    return requiredRoles.some(role => this.checkRole(role, flags));
  }

    /**
     * Check if the user has the required role.
     * @param role the required role
     * @param flags the user flags
     * @returns true if the user has the required role
     */
    private checkRole(role: AuthRoles, flags: userFlags): boolean {

      /*admin override all*/
      if(flags.admin) return true;

      switch(role) {
        case AuthRoles.Administrator: return flags.admin;
        case AuthRoles.Moderator: return flags.moderator;
        case AuthRoles.ContentModerator: return flags.contentModerator;
        case AuthRoles.Member: return true;
        default: return false;
      }
    }
}
