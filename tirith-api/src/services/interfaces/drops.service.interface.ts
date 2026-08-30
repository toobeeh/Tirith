import {DropHistoryDto} from "../../modules/palantir/dto/dropHistory.dto";

export const IDropsService = Symbol("IDropsService");

export interface IDropsService {

    getDropHistory(logins: number[], historyStart: Date, historyEnd: Date): Promise<DropHistoryDto[]>
}
