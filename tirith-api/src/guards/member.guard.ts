/*
https://docs.nestjs.com/guards#guards
*/
import { Request } from 'express';
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthentificationService } from 'src/services/authentification.service';

@Injectable()
export class MemberGuard implements CanActivate {

  constructor(private auth: AuthentificationService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers["authorization"]?.split(" ")[1] ?? null;
    if (!token) throw new HttpException("No auth token present", HttpStatus.UNAUTHORIZED);

    const user = await this.auth.authenticate(token);
    if (!user) throw new HttpException("No authorized user present", HttpStatus.UNAUTHORIZED);

    Object.defineProperty(request, "user", {
      enumerable: true,
      writable: false,
      value: user.result,
    });
    return true;
  }
}
