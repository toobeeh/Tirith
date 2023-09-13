
/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthentificationService } from 'src/services/authentification.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {

  constructor(private auth: AuthentificationService) { }

  async use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization?.split(' ')[1];
    const user = await this.auth.authenticate(token);
    Object.defineProperty(req, "user", {
      enumerable: true,
      writable: false,
      value: user.result,
    });
    next();
  }
}
