import {Long} from "@grpc/proto-loader";
import {CloudUploadDto} from "../../modules/palantir/dto/cloudUpload.dto";

export const IObjectStorageService = Symbol("IObjectStorageService");

export interface IObjectStorageService {

    saveImageToCloud(ownerLogin: number, userFolder: string, imageId: Long, creationDate: Date, data: CloudUploadDto): Promise<void>;
}