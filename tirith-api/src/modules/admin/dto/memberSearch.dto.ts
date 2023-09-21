import { XApiProperty } from "src/decorators/apiProperty.decorator";

export class MemberSearchDto {

    @XApiProperty({ description: "The member's palantir accunt user name" })
    userName: string;

    @XApiProperty({ description: "The member's palantir identification" })
    userLogin: string;

    @XApiProperty({ description: "The raw database member result" })
    rawMember: any
}