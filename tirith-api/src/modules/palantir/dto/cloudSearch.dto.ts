import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class CloudSearchDto {

    @XApiProperty({ description: "The size of a single search result page" })
    pageSize: number;

    @XApiProperty({ description: "The current pagination index for given search criteria" })
    page: number;

    @XApiProperty({ required: false, description: "Exact name of the author" })
    authorQuery?: string;

    @XApiProperty({ required: false, description: "Exact language of the lobby" })
    languageQuery?: string;

    @XApiProperty({ required: false, description: "Oldest creation date filter" })
    createdBeforeQuery?: string;

    @XApiProperty({ required: false, description: "Most recent creation date filter" })
    createdAfterQuery?: string;

    @XApiProperty({ required: false, description: "Filter for private lobbies" })
    createdInPrivateLobbyQuery?: boolean;

    @XApiProperty({ required: false, description: "Filter for own drawings" })
    isOwnQuery?: boolean;

    @XApiProperty({ required: false, description: "Exact title of the drawing" })
    titleQuery?: string;
}