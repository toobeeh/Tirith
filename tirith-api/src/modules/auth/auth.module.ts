import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { DiscordOauthService } from 'src/modules/auth/service/discord-oauth.service';
import { GrpcModule } from '../grpc/grpc.module';

@Module({
    imports: [
        GrpcModule
    ],
    controllers: [
        AuthController,],
    providers: [DiscordOauthService],
})
export class AuthModule {
}
