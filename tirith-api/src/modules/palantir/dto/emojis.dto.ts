import { XApiProperty } from "src/decorators/apiProperty.decorator";

export class EmojiCandidateDto {

    @XApiProperty({ description: "Emoji name" })
    name: string;

    @XApiProperty({ description: "Emoji url" })
    url: string;

    @XApiProperty({ description: "Whether emoji is animated or static" })
    animated: boolean;
}

export class EmojiDto extends EmojiCandidateDto {

    @XApiProperty({ description: "Emoji name id appendix" })
    nameId?: number;
}

export class EmojiSearchDto {

    @XApiProperty({ description: "Search query", required: false })
    query?: string;

    @XApiProperty({ description: "Limit of results" })
    limit: number;

    @XApiProperty({ description: "Whether to include animated emojis" })
    animated: boolean;

    @XApiProperty({ description: "Whether to include static emojis" })
    statics: boolean;
}

export class NameIdDto {

    @XApiProperty({ description: "Emoji name id appendix", required: false })
    nameId?: number;
}