import { AwardDto } from "../../modules/palantir/dto/awards.dto";

export const IAwardsService = Symbol("IAwardsService");

export interface IAwardsService {

    /**
     * Get all available Awards
     */
    getAllAwards(): Promise<AwardDto[]>;

    /**
     * Get a Award 
     * @param id the Award id
     */
    getAward(id: number): Promise<AwardDto>;
}