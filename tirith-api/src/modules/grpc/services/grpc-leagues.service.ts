import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {GrpcBaseService} from "./grpc-base";
import {LeaguesDefinition} from "../proto-compiled/leagues";
import {ILeaguesService} from "../../../services/interfaces/leagues.service.interface";
import {LeagueSeasonEvaluationDto, LeagueSeasonMemberEvaluationDto} from "../../palantir/dto/leagues.dto";

@Injectable()
export class GrpcLeaguesService extends GrpcBaseService<LeaguesDefinition> implements ILeaguesService {

    constructor(config: ConfigService) {
        super(LeaguesDefinition, config);
    }

    async evaluateMemberLeagueSeason(login: number, year: number, month: number): Promise<LeagueSeasonMemberEvaluationDto> {
        return await this.grpcClient.evaluateMemberLeagueSeason({login, month, year});
    }

    async evaluateMemberCurrentLeagueSeason(login: number): Promise<LeagueSeasonMemberEvaluationDto> {
        return await this.grpcClient.evaluateMemberCurrentLeagueSeason({login});
    }

    async evaluateLeagueSeason(year: number, month: number): Promise<LeagueSeasonEvaluationDto> {
        return await this.grpcClient.evaluateLeagueSeason({month, year});
    }

    async evaluateCurrentLeagueSeason(): Promise<LeagueSeasonEvaluationDto> {
        return await this.grpcClient.evaluateCurrentLeagueSeason({});
    }
}