import {LeagueSeasonEvaluationDto, LeagueSeasonMemberEvaluationDto} from "../../modules/palantir/dto/leagues.dto";

export const ILeaguesService = Symbol("ILeaguesService");

export interface ILeaguesService {

    evaluateMemberLeagueSeason(login: number, year: number, month: number): Promise<LeagueSeasonMemberEvaluationDto>;

    evaluateMemberCurrentLeagueSeason(login: number): Promise<LeagueSeasonMemberEvaluationDto>;

    evaluateLeagueSeason(year: number, month: number): Promise<LeagueSeasonEvaluationDto>;

    evaluateCurrentLeagueSeason(): Promise<LeagueSeasonEvaluationDto>;
}