import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class CreateTypoAccountOptionsDto {

    @XApiProperty({description: "Connect the new member to TT typo server home"})
    connectTypoTestground: boolean;
}

export class OAuth2AuthenticationDto {

    @XApiProperty({description: "The encrypted access token which had previously been received in the preauthorize step"})
    discordEncryptedAccessToken: string;

    @XApiProperty({description: "The client ID of the application requesting authentication"})
    clientId: number;

    @XApiProperty({description: "Required account creation options if the user has no account yet", required: false})
    createAccountOptions?: CreateTypoAccountOptionsDto;
}