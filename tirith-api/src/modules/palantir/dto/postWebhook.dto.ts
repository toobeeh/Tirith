import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class PostImageDto {

    @XApiProperty({ description: "Image title" })
    title: string;

    @XApiProperty({ description: "Image author" })
    author: string;

    @XApiProperty({ description: "Image poster name" })
    posterName: string;

    @XApiProperty({ description: "Post only image without embed" })
    onlyImage: boolean;

    @XApiProperty({ description: "Base64 url representation of the image" })
    imageBase64: string;
}