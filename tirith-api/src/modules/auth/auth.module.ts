import { DiscordOauthMiddleware } from 'src/middleware/discord-oauth.middleware';
import { AuthController } from './auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DiscordOauthService } from 'src/services/discord-oauth.service';
import { PalantirdbService } from 'src/services/palantirdb.service';

@Module({
    imports: [],
    controllers: [
        AuthController,],
    providers: [DiscordOauthService, PalantirdbService],
})
export class AuthModule {

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(DiscordOauthMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
