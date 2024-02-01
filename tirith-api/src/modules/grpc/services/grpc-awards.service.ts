import { IAwardsService } from "src/modules/palantir/services/awards.service.interface";
import { AwardReply, AwardsDefinition } from "../proto-compiled/awards";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GrpcBaseService } from "./grpc-base.abstract";
import { AwardDto } from "src/modules/palantir/dto/awards.dto";

@Injectable()
export class GrpcAwardsService extends GrpcBaseService<AwardsDefinition> implements IAwardsService {

    constructor(config: ConfigService) {
        super(AwardsDefinition, config);
    }

    private awardReplyToDto(reply: AwardReply): AwardDto {
        return reply;
    }

    async getAllAwards(): Promise<AwardDto[]> {
        const awards = await this.collectFromAsyncIterable(this.grpcClient.getAllAwards({}));
        return awards.map(t => this.awardReplyToDto(t));
    }

    async getAward(id: number): Promise<AwardDto> {
        const award = await this.grpcClient.getAwardById({ id });
        return this.awardReplyToDto(award);
    }
}