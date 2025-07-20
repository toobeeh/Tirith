import { XApiProperty } from "src/decorators/apiProperty.decorator";
import {MemberFlagDto} from "./member.dto";

export class PublicMemberDto {

    @XApiProperty({ description: "The member's connected discord account id" })
    discordID: string;

    @XApiProperty({ description: "The member's palantir accunt user name" })
    userName: string;

    @XApiProperty({ description: "DEPRECATED. Use TypoId instead.", deprecated: true })
    userLogin: string;

    @XApiProperty({ description: "The member's typo unique identification" })
    typoId: number;

    @XApiProperty({ description: "Enum array containing the flags of the member", enum: MemberFlagDto, isArray: true })
    memberFlags: MemberFlagDto[];
}
