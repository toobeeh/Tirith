import {OAuth2AuthorizationCodeDto} from "./oauth2AuthorizationCode.dto";
import {MemberDto} from "../../palantir/dto/member.dto";
import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class OAuth2AuthenticationResultDto {

    @XApiProperty({description: "The created typo oauth authorization code", type: () => OAuth2AuthorizationCodeDto})
    result: OAuth2AuthorizationCodeDto;

    @XApiProperty({description: "The authenticated member", type: () => MemberDto})
    member: MemberDto;
}