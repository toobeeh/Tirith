import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { DiscordOauthService } from 'src/modules/auth/service/discord-oauth.service';
import { PalantirdbService } from 'src/services/palantirdb.service';

@Module({
    imports: [],
    controllers: [
        AuthController,],
    providers: [DiscordOauthService, PalantirdbService],
})
export class AuthModule {
}
