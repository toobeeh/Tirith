import { AuthentificationService } from 'src/services/authentification.service';
import { LobbiesController } from './lobbies.controller';
/*
https://docs.nestjs.com/modules
*/

import { PalantirdbService } from 'src/services/palantirdb.service';
import { MembersController } from './members.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        LobbiesController,
        MembersController
    ],
    providers: [AuthentificationService, PalantirdbService],
})
export class AdminModule { }
