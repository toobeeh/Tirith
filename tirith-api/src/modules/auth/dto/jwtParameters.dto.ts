import {XApiProperty} from "../../../decorators/apiProperty.decorator";
import {MemberDto} from "../../palantir/dto/member.dto";

export class JwtParametersDto {

    @XApiProperty({ description: "The discord oauth authorization code to identify the calling user" })
    code: string;

    @XApiProperty({ description: "The name of the application that requests the JWT" })
    applicationName: string;

    @XApiProperty({ description: "The target uri that will receive the token as 'token' query parameter after authorization completed" })
    redirectUri: string;

    @XApiProperty({ description: "The scopes that the JWT will be authorized to use", isArray: true, type: () => String })
    scopes: Array<string>;

    @XApiProperty({ description: "The time in ms when the token will expire" })
    expiryMs: number;
}

export class JwtResponseDto {

    @XApiProperty({ description: "The generated jwt" })
    token: string;

    @XApiProperty({ description: "The authenticated typo member" })
    member: MemberDto;
}

export class RegistrationDto {

    @XApiProperty({ description: "Params for creating a jwt after the user has been created" })
    params: JwtParametersDto;

    @XApiProperty({ description: "The flag whether the user wants to conenct to the typo server" })
    connectTypo: boolean;
}