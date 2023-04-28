import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserMiddleware } from './middleware/user.middleware';
import { AuthentificationService } from './services/authentification.service';
import { PalantirdbService } from './services/palantirdb.service';
import { AdminModule } from './modules/admin/admin.module';
import { ConfigModule } from '@nestjs/config';

import config from './config/production.config.ts';
import configDev from './config/development.config.ts';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        ENV == "development" ? configDev : config
      ],
      isGlobal: true
    }),
    AdminModule
  ],
  controllers: [AppController],
  providers: [AuthentificationService, PalantirdbService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }


}
