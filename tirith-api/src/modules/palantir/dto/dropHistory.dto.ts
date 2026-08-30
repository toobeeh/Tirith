import {XApiProperty} from "../../../decorators/apiProperty.decorator";

export class DropHistoryDto {

    @XApiProperty({ description: "Member typo id that this history belongs to" })
    login: number;

    @XApiProperty({ description: "Caught drops of the member in the history range", isArray: true, type: () => DropHistoryEntryDto })
    history: DropHistoryEntryDto[];
}

export class DropHistoryEntryDto {

    @XApiProperty({ description: "Timestamp of the drop release" })
    timestamp: string;

    @XApiProperty({ description: "Catch time of the drop" })
    catchMs: number;
}

export class DropHistoryParamsDto {

    @XApiProperty({ description: "Timestamp of history range start" })
    historyStart: string;

    @XApiProperty({ description: "Timestamp of history range end" })
    historyEnd: string;

    @XApiProperty({ description: "User ids that the history will be fetched for" })
    logins: number[];
}
