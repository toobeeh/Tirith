import {XApiProperty} from "../../../decorators/apiProperty.decorator";
import {MemberDto} from "../../palantir/dto/member.dto";

export class JwtParametersDto {

    @XApiProperty({ description: "The discord oauth authorization code to identify the calling user" })
    code: string;

    @XApiProperty({ description: "The name of the application that requests the JWT" })
    applicationName: string;

    @XApiProperty({ description: "The target uri that will receive the token as 'token' query parameter after authorization completed" })
    redirectUri: string;

    @XApiProperty({ description: "The scopes that the JWT will be authorized to use" })
    scopes: string[];

    @XApiProperty({ description: "The time in ms when the token will expire" })
    expiryMs: number;
}

export class JwtVerifiedParametersDto {

    @XApiProperty({ description: "The discord oauth authorization code to identify the calling user" })
    code: string;

    @XApiProperty({ description: "The id of the verified application that requests the JWT" })
    applicationId: number;
}

export class JwtResponseDto {

    @XApiProperty({ description: "The generated jwt" })
    token: string;

    @XApiProperty({ description: "The authenticated typo member" })
    member: MemberDto;
}

export class JwtRegistrationDto {

    @XApiProperty({ description: "Params for creating a jwt after the user has been created" })
    params: JwtParametersDto;

    @XApiProperty({ description: "The flag whether the user wants to connect to the typo server" })
    connectTypo: boolean;
}

export class JwtVerifiedRegistrationDto {

    @XApiProperty({ description: "Params for creating a jwt after the user has been created" })
    params: JwtVerifiedParametersDto;

    @XApiProperty({ description: "The flag whether the user wants to connect to the typo server" })
    connectTypo: boolean;
}

export class JwtScopeDto {
    @XApiProperty({ description: "The name/id of a scope" })
    name: string;

    @XApiProperty({ description: "The description of the scope" })
    description: string;
}