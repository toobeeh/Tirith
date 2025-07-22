import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { DiscordOauthService } from 'src/modules/auth/service/discord-oauth.service';
import { GrpcModule } from '../grpc/grpc.module';
import {OAuth2Controller} from "./controller/oauth2.controller";
import {AuthenticationService} from "../../services/authentication.service";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {ResponseReshapeInterceptor} from "../../interceptors/responsereshape.interceptor";
import {CryptoService} from "../../services/crypto.service";

@Module({
    imports: [
        GrpcModule
    ],
    controllers: [
        AuthController,
        OAuth2Controller
    ],
    providers: [
        DiscordOauthService,
        CryptoService,
        AuthenticationService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseReshapeInterceptor,
        }
    ],
})
export class AuthModule {
}
