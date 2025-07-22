import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { DiscordOauthService } from 'src/modules/auth/service/discord-oauth.service';
import { GrpcModule } from '../grpc/grpc.module';
import {OAuth2Controller} from "./controller/oauth2.controller";
import {CryptoService} from "./service/crypto-oauth.service";
import {AuthenticationService} from "../../services/authentication.service";

@Module({
    imports: [
        GrpcModule
    ],
    controllers: [
        AuthController,
        OAuth2Controller
    ],
    providers: [DiscordOauthService, CryptoService, AuthenticationService],
})
export class AuthModule {
}
