import { AuthentificationService } from 'src/services/authentification.service';
import { AdminController } from './admin.controller';
/*
https://docs.nestjs.com/modules
*/

import { Get, Module } from '@nestjs/common';
import { PalantirdbService } from 'src/services/palantirdb.service';

@Module({
    imports: [],
    controllers: [
        AdminController,],
    providers: [AuthentificationService, PalantirdbService],
})
export class AdminModule {
}
