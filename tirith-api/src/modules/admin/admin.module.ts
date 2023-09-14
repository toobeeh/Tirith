import { AuthentificationService } from 'src/services/authentification.service';
import { AdminController } from './admin.controller';
/*
https://docs.nestjs.com/modules
*/

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PalantirdbService } from 'src/services/palantirdb.service';
import { UserMiddleware } from 'src/middleware/user.middleware';
import { ResponseTimeMiddleware } from '@nest-middlewares/response-time';

@Module({
    imports: [],
    controllers: [
        AdminController,],
    providers: [AuthentificationService, PalantirdbService],
})
export class AdminModule {

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UserMiddleware)
            .forRoutes({ path: "admin/*", method: RequestMethod.ALL });
        consumer
            .apply(ResponseTimeMiddleware)
            .forRoutes("admin/*")
    }
}
