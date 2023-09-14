import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { DiscordOauthService } from 'src/services/discord-oauth.service';
import { PalantirdbService } from 'src/services/palantirdb.service';

@Module({
    imports: [],
    controllers: [
        AuthController,],
    providers: [DiscordOauthService, PalantirdbService],
})
export class AuthModule {
}
