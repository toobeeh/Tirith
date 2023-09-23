import { DropsService } from './services/drops.service';
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
    PalantirModule, AuthModule
  ],
  controllers: [
    AppController],
  providers: [
    DropsService,
    AuthentificationService, PalantirdbService, DiscordOauthService],
})
export class AppModule { }
