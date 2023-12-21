import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthentificationService } from './services/authentification.service';
import { PalantirdbService } from './services/palantirdb.service';
import { PalantirModule } from './modules/palantir/palantir.module';
import { ConfigModule } from '@nestjs/config';

import config from './config/production.config';
import configDev from './config/development.config';
import { DiscordOauthService } from './services/discord-oauth.service';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { getThrottleDefinition } from './guards/trottleConfigs';

const ENV = process.env.NODE_ENV;
console.log(`Starting in environment ${ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        ENV == "development" ? configDev : config
      ],
      isGlobal: true
    }),
    ThrottlerModule.forRoot([
      getThrottleDefinition("throttleTenPerMinute")
    ]),
    PalantirModule, AuthModule
  ],
  controllers: [
    AppController
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  },
    AuthentificationService, PalantirdbService, DiscordOauthService],
})
export class AppModule { }
