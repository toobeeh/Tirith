import { ApiProperty } from "@nestjs/swagger";
/* import { Members } from "palantir-db/dist/src/schema"; */

export class RegistrationRequest {

    @ApiProperty({ description: "The discord oauth authorization code" })
    code: string;

    @ApiProperty({ description: "The flag whether the user wants to conenct to the typo server" })
    connectTypo: boolean;
}

export class TokenResponse {

    @ApiProperty({ description: "The acces token to log in to the new account" })
    accessToken: string;

    @ApiProperty({ description: "The discord user id of the oauth code" })
    userId: string;

    @ApiProperty({ description: "The discord user name of the oauth code" })
    userName: string;

    /* @ApiProperty({ name: "The unprocessed user data of the newly created user" })
    memberRaw?: Members; */
}