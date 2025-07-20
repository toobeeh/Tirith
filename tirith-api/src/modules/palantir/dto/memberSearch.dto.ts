import { XApiProperty } from "src/decorators/apiProperty.decorator";

export class MemberSearchDto {

    @XApiProperty({ description: "The member's palantir accunt user name" })
    userName: string;

    @XApiProperty({ description: "DEPRECATED. Use TypoId instead.", deprecated: true })
    userLogin: string;

    @XApiProperty({ description: "The member's typo unique identification" })
    typoId: number;

    @XApiProperty({ description: "The raw database member result" })
    rawMember: any
}