import { XApiProperty } from "src/decorators/apiProperty.decorator";

export class MemberDto {

    @XApiProperty({ description: "The member's plain bubbles" })
    bubbles: number;

    @XApiProperty({ description: "The member's regular drops" })
    drops: number;

    @XApiProperty({ description: "The member's sprite inventory" })
    sprites: string;

    @XApiProperty({ description: "The member's scene inventory" })
    scenes: string;

    @XApiProperty({ description: "The member's flag config" })
    flags: number;

    @XApiProperty({ description: "The member's rainbow sprite config" })
    rainbowSprites: string;

    @XApiProperty({ description: "The member's connected discord account id" })
    discordID: string;

    @XApiProperty({ description: "The member's palantir accunt user name" })
    userName: string;

    @XApiProperty({ description: "The member's palantir identification" })
    userLogin: string;

    @XApiProperty({ description: "The member's palantir identification", type: () => GuildDto, isArray: true })
    guilds: GuildDto[];

    @XApiProperty({ description: "The raw database member result" })
    rawMember: any
}

export class GuildDto {

    @XApiProperty({ description: "The guild's ID" })
    GuildID: string;

    @XApiProperty({ description: "The guild's Palantir message channel ID" })
    ChannelID: string;

    @XApiProperty({ description: "The guild's Palantir message ID" })
    MessageID: string;

    @XApiProperty({ description: "The guild's Palantir token" })
    ObserveToken: number;

    @XApiProperty({ description: "The guild's name" })
    GuildName: string;

    @XApiProperty({ description: "The guild's post webhooks", type: () => WebhookDto, isArray: true })
    Webhooks: WebhookDto[];
}

export class WebhookDto {

    @XApiProperty({ description: "The webhook name" })
    Name: string;

    @XApiProperty({ description: "The webhook's guild name" })
    Guild: string;

    @XApiProperty({ description: "The webhook URL" })
    URL: string;
}

export class AccessTokenDto {

    @XApiProperty({ description: "The access token of an user" })
    Token: string;
}

