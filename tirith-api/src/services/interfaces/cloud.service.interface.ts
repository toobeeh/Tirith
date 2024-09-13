import {CloudSearchDto} from "../../modules/palantir/dto/cloudSearch.dto";
import {CloudImageDto} from "../../modules/palantir/dto/cloud.dto";

export const ICloudService = Symbol("ICloudService");

export interface ICloudService {

    searchDrawings(login: number, filter: CloudSearchDto): Promise<CloudImageDto[]>;
}