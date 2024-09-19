import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class CloudDeleteDto {

    @XApiProperty({ description: "Ids that will be removed from the cloud", isArray: true, type: () => String })
    ids: string[];
}
