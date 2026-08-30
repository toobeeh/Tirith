import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {GrpcBaseService} from "./grpc-base";
import {DropHistoryMessage, DropsDefinition} from "../proto-compiled/drops";
import {IDropsService} from "../../../services/interfaces/drops.service.interface";
import {DropHistoryDto} from "../../palantir/dto/dropHistory.dto";

@Injectable()
export class GrpcDropsService extends GrpcBaseService<DropsDefinition> implements IDropsService {

    constructor(config: ConfigService) {
        super(DropsDefinition, config);
    }

    private historyMessageToDto(reply: DropHistoryMessage): DropHistoryDto {
        return {
            login: reply.login,
            history: reply.history.map(item => ({
                timestamp: item.dropDate.getTime().toString(),
                catchMs: item.catchMs
            }))
        };
    }

    async getDropHistory(logins: number[], historyStart: Date, historyEnd: Date): Promise<Array<DropHistoryDto>> {
        const request = {
            logins: logins,
            historyStart: historyStart,
            historyEnd: historyEnd
        };

        return await this.collectFromMappedAsyncIterable(
            this.grpcClient.getDropHistory(request),
            item => this.historyMessageToDto(item)
        );
    }
}
