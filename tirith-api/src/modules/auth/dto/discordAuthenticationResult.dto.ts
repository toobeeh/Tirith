import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class DiscordAuthenticationResultDto {

    @XApiProperty({description: "The decrypted access token for the discord user that has authenticated using an auth code"})
    encryptedAccessToken: string;

    @XApiProperty({description: "Whether the user already has a typo account or not"})
    hasTypoAccount: boolean;
}