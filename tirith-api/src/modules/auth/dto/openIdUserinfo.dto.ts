import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class OpenIdUserinfoDto {
    @XApiProperty({description: "Unique identifier for the user"})
    sub: string;
}