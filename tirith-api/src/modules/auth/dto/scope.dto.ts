import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class ScopeDto {
    @XApiProperty({ description: "The name/id of a scope" })
    name: string;

    @XApiProperty({ description: "The description of the scope" })
    description: string;
}