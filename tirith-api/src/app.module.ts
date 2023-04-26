import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserMiddleware } from './middleware/user.middleware';
import { AuthentificationService } from './services/authentification.service';
import { PalantirdbService } from './services/palantirdb.service';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [AdminModule],
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
