/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { member } from 'palantir-db/dist/src/types';
import { Observable } from 'rxjs';
import { AuthentificationService } from 'src/services/authentification.service';

@Injectable()
export class AuthentificationGuard implements CanActivate {

  constructor(private auth: AuthentificationService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user: member = context.switchToHttp().getRequest().user;
    const flags = this.auth.parseFlags(user.flags);
    return flags.admin || flags.moderator;
  }
}
