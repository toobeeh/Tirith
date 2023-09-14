import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthentificationService } from './services/authentification.service';
import { PalantirdbService } from './services/palantirdb.service';
import { AdminModule } from './modules/admin/admin.module';
import { ConfigModule } from '@nestjs/config';

import config from './config/production.config';
import configDev from './config/development.config';
import { DiscordOauthService } from './services/discord-oauth.service';
import { AuthModule } from './modules/auth/auth.module';

const ENV = process.env.NODE_ENV;
console.log(ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        ENV == "development" ? configDev : config
      ],
      isGlobal: true
    }),
    AdminModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AuthentificationService, PalantirdbService, DiscordOauthService],
})
export class AppModule { }
