/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { DiscordOauthService } from 'src/services/discord-oauth.service';

@Injectable()
export class DiscordOauthMiddleware implements NestMiddleware {

  constructor(private discordOauth: DiscordOauthService) { }

  async use(req: Request, res: Response, next: Function) {
    const code = req.headers.authorization?.split(' ')[1];

    /* check if code pressent */
    if (code === null || code === undefined || code.length === 0) return false;

    const accessToken = await this.discordOauth.getAccessToken(code);
    const user = await this.discordOauth.getUser(accessToken);

    res.locals.user = user;

    next();
  }
}
