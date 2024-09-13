import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class CloudImageDto {

    @XApiProperty({ description: "Image name" })
    name: string;

    @XApiProperty({ description: "Image author" })
    author: string;

    @XApiProperty({ description: "Image creation timestamp ms" })
    createdAt: string;

    @XApiProperty({ description: "Image Id" })
    id: string;

    @XApiProperty({ description: "Meta Url" })
    metaUrl: string;

    @XApiProperty({ description: "Draw commands Url" })
    commandsUrl: string;

    @XApiProperty({ description: "Image Url" })
    imageUrl: string;
}