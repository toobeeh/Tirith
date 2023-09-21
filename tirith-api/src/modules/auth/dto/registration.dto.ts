import { XApiProperty } from "src/decorators/apiProperty.decorator";


export class RegistrationRequest {

    @XApiProperty({ description: "The discord oauth authorization code" })
    code: string;

    @XApiProperty({ description: "The flag whether the user wants to conenct to the typo server" })
    connectTypo: boolean;
}

export class TokenResponse {

    @XApiProperty({ description: "The acces token to log in to the new account" })
    accessToken: string;

    @XApiProperty({ description: "The discord user id of the oauth code" })
    userId: string;

    @XApiProperty({ description: "The discord user name of the oauth code" })
    userName: string;

    /* @ApiProperty({ name: "The unprocessed user data of the newly created user" })
    memberRaw?: Members; */
}