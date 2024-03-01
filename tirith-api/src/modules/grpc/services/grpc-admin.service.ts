import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {GrpcBaseService} from "./grpc-base";
import {AdminDefinition} from "../proto-compiled/admin";
import {IAdminService} from "../../../services/interfaces/admin.service.interface";

@Injectable()
export class GrpcAdminService extends GrpcBaseService<AdminDefinition> implements IAdminService {

    constructor(config: ConfigService) {
        super(AdminDefinition, config);
    }

    async reevaluateDropChunks(): Promise<void> {
        await this.grpcClient.reevaluateDropChunks({});
    }
}