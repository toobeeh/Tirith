import {CloudSearchDto} from "../../modules/palantir/dto/cloudSearch.dto";
import {CloudImageDto} from "../../modules/palantir/dto/cloud.dto";
import {CloudUploadDto} from "../../modules/palantir/dto/cloudUpload.dto";
import {Long} from "@grpc/proto-loader";

export const ICloudService = Symbol("ICloudService");

export interface ICloudService {

    searchDrawings(login: number, filter: CloudSearchDto): Promise<CloudImageDto[]>;

    saveImageToCloud(data: CloudUploadDto, ownerLogin: number, creationDate: Date): Promise<Long>;

    removeImageFromCloud(ownerLogin: number, ids: Long[]): Promise<void>;

    getImageFromCloud(ownerLogin: number, id: Long): Promise<CloudImageDto>;

    linkImageToAward(ownerLogin: number, awardInventoryId: number, imageId: Long): Promise<void>;
}