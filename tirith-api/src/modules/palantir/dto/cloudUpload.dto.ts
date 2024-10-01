import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class CloudUploadDto {

    @XApiProperty({ description: "Image name" })
    name: string;

    @XApiProperty({ description: "Image author name" })
    author: string;

    @XApiProperty({ description: "Whether the image was created in a private lobby" })
    inPrivate: boolean;

    @XApiProperty({ description: "If the image author is the cloud owner" })
    isOwn: boolean;

    @XApiProperty({ description: "Lobby language where the image was created" })
    language: string;

    @XApiProperty({ description: "Commands of the image for skribbl recreation", isArray: true, type: () => Object, validateNested: false })
    commands: any[];

    @XApiProperty({ description: "base64 representation of the image" })
    imageBase64: string;
}
