import { IAwardsService } from "src/modules/palantir/service/awards.service.interface";
import { AwardsDefinition } from "../proto-compiled/awards";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GrpcBaseService } from "./grpc-base.abstract";
import { AwardDto } from "src/modules/palantir/dto/awards.dto";

@Injectable()
export class GrpcAwardsService extends GrpcBaseService<AwardsDefinition> implements IAwardsService {

    constructor(config: ConfigService) {
        super(AwardsDefinition, config);
    }

    getAllAwards(): Promise<AwardDto[]> {
        throw new Error("Method not implemented.");
    }

    getAward(id: number): Promise<AwardDto> {
        throw new Error("Method not implemented.");
    }
}