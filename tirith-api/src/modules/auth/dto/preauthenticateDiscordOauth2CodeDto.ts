import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class PreauthenticateDiscordOauth2CodeDto {
    @XApiProperty({description: "The discord authorization code used to exchange for a discord access token"})
    authorizationCode: string;
}