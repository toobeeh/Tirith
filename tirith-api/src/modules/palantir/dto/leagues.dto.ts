import { XApiProperty } from "src/decorators/apiProperty.decorator";

export class LeagueSeasonEvaluationDto {

    @XApiProperty({ description: "The year of the league season" })
    year: number;

    @XApiProperty({ description: "The month of the league season" })
    month: number;

    @XApiProperty({ description: "Ranking of all participants in category count", type: () => LeagueCountRanking, isArray: true })
    countRanking: LeagueCountRanking[];

    @XApiProperty({ description: "Ranking of all participants in category score", type: () => LeagueScoreRanking, isArray: true })
    scoreRanking: LeagueScoreRanking[];

    @XApiProperty({ description: "Ranking of all participants in category streak", type: () => LeagueStreakRanking, isArray: true })
    streakRanking: LeagueStreakRanking[];

    @XApiProperty({ description: "Ranking of all participants in category average weight", type: () => LeagueAverageWeightRanking, isArray: true })
    weightRanking: LeagueAverageWeightRanking[];

    @XApiProperty({ description: "Ranking of all participants in category average time", type: () => LeagueAverageTimeRanking, isArray: true })
    timeRanking: LeagueAverageTimeRanking[];
}

export class LeagueSeasonMemberEvaluationDto {

    @XApiProperty({ description: "The year of the league season" })
    year: number;

    @XApiProperty({ description: "The month of the league season" })
    month: number;

    @XApiProperty({ description: "Sum of the weighted scores of each league drop" })
    score: number;

    @XApiProperty({ description: "Amount of league drops collected" })
    count: number;

    @XApiProperty({ description: "The maximum streak of caught league drops" })
    maxStreak: number;

    @XApiProperty({ description: "The current streak of caught league drops" })
    currentStreak: number;

    @XApiProperty({ description: "The average catch response time of all caught league drops" })
    averageTime: number;

    @XApiProperty({ description: "The average of weighted value of all caught league drops" })
    averageWeight: number;
}

export class LeagueCountRanking {
    @XApiProperty({ description: "The palantir username of the participant" })
    name: string;

    @XApiProperty({ description: "Amount of league drops collected" })
    caughtDrops: number;
}
export class LeagueScoreRanking {
    @XApiProperty({ description: "The palantir username of the participant" })
    name: string;

    @XApiProperty({ description: "Sum of the weighted scores of each league drop" })
    score: number;
}
export class LeagueStreakRanking {
    @XApiProperty({ description: "The palantir username of the participant" })
    name: string;

    @XApiProperty({ description: "The maximum streak of caught league drops" })
    maxStreak: number;
}
export class LeagueAverageWeightRanking {
    @XApiProperty({ description: "The palantir username of the participant" })
    name: string;

    @XApiProperty({ description: "The average of weighted value of all caught league drops" })
    averageWeight: number;
}
export class LeagueAverageTimeRanking {
    @XApiProperty({ description: "The palantir username of the participant" })
    name: string;

    @XApiProperty({ description: "The average catch response time of all caught league drops" })
    averageTime: number;
}

export class SeasonYearParamDto {

    @XApiProperty({ description: "Season year parameter" })
    year: number;
}

export class SeasonMonthParamDto {

    @XApiProperty({ description: "Season month parameter" })
    month: number;
}