import { XApiProperty } from "src/decorators/apiProperty.decorator";
export enum MemberFlagDto {
    Admin = "Admin",
    Moderator = "Moderator",
    Patron = "Patron",
    Patronizer = "Patronizer",
    Booster = "Booster",
    DropBan = "DropBan",
    PermaBan = "PermaBan",
    Beta = "Beta",
    BubbleFarming = "BubbleFarming",
    UnlimitedCloud = "UnlimitedCloud",
    ContentModerator = "ContentModerator",
    EmojiManagement = "EmojiManagement",
}
export class MemberDto {

    @XApiProperty({ description: "The member's plain bubbles" })
    bubbles: number;

    @XApiProperty({ description: "The member's regular drops" })
    drops: number;

    /*@XApiProperty({ description: "The bubble value of all caught league drops" })
    leagueDropValue: number;

    @XApiProperty({ description: "The count of all caught league drops" })
    leagueDropCount: number;*/

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

    @XApiProperty({ description: "Enum array containing the flags of the member", enum: MemberFlagDto, isArray: true })
    memberFlags: MemberFlagDto[];
}

export class GuildDto {

    @XApiProperty({ description: "The guild's ID" })
    GuildID: string;

    @XApiProperty({ description: "The guild's Palantir token" })
    Invite: number;

    @XApiProperty({ description: "The guild's name" })
    GuildName: string;
}

export class WebhookDto {

    @XApiProperty({ description: "The webhook name" })
    Name: string;

    @XApiProperty({ description: "The webhook's guild", type: () => GuildDto })
    Guild: GuildDto;

    @XApiProperty({ description: "The webhook URL" })
    URL: string;
}

export class MemberWebhookDto {

    @XApiProperty({ description: "The webhook name" })
    Name: string;

    @XApiProperty({ description: "The webhook's guild", type: () => GuildDto })
    Guild: GuildDto;
}

export class AccessTokenDto {

    @XApiProperty({ description: "The access token of an user" })
    Token: string;
}

