import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PalantirModule } from './modules/palantir/palantir.module';
import { ConfigModule } from '@nestjs/config';

import config from './config/production.config';
import configDev from './config/development.config';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { getThrottleDefinition } from './guards/trottleConfigs';
import { GrpcModule } from './modules/grpc/grpc.module';

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
    PalantirModule, AuthModule, GrpcModule
  ],
  controllers: [
    AppController
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  },
  ],
})
export class AppModule { }
