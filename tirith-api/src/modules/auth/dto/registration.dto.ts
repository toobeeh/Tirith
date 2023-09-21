import { ApiProperty } from "@nestjs/swagger";
import * as DiscordOauth from "discord-oauth2";
import { Members } from "palantir-db/dist/src/schema";

export class Registration {

    @ApiProperty()
    code: string;

    @ApiProperty()
    connectTypo: boolean;
}

export class RegistrationResult {

    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    user: DiscordOauth.User;

    @ApiProperty()
    member?: Members;
}