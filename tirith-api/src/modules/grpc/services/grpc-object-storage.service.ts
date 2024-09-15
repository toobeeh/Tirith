import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {GrpcBaseService} from "./grpc-base";
import {Long} from "@grpc/proto-loader";
import {IObjectStorageService} from "../../../services/interfaces/object-storage.service.interface";
import {ObjectStorageDefinition, SaveImageToCloudMessage} from "../proto-compiled/objectStorage";
import {asyncIteratorFromArray, createByteChunks} from "../../../utils/grpcFileChunkCollector";
import {CloudUploadDto} from "../../palantir/dto/cloudUpload.dto";

@Injectable()
export class GrpcObjectStorageService extends GrpcBaseService<ObjectStorageDefinition> implements IObjectStorageService {

    constructor(config: ConfigService) {
        super(ObjectStorageDefinition, config, "GRPC_CONTENT_CHANNEL");
    }

    async saveImageToCloud(ownerLogin: number, userFolder: string, imageId: Long, creationDate: Date, data: CloudUploadDto) {

        const commandsBytes = Buffer.from(JSON.stringify(data.commands), "utf-8");
        const imageBytes = Buffer.from(data.imageBase64, "base64url");
        const metaBytes = Buffer.from(JSON.stringify({
            author: data.author,
            language: data.language,
            login: ownerLogin,
            name: data.name,
            own: data.isOwn,
            private: data.inPrivate,
            date: creationDate.toString()
        }), "utf-8");

        const messages = this.createCloudUploadMessages(imageBytes, commandsBytes, metaBytes, imageId, userFolder);
        await this.grpcClient.saveImageToCloud(asyncIteratorFromArray(messages));
    }

    private createCloudUploadMessages(
        imageBytes: Uint8Array,
        commandsBytes: Uint8Array,
        metaBytes: Uint8Array,
        imageId: Long,
        userFolder: string
    ): SaveImageToCloudMessage[] {

        // Create file chunk messages
        const imageMessages: SaveImageToCloudMessage[] = createByteChunks(imageBytes, `${userFolder}/${imageId}/image`, "png").map(chunk => ({imageFileChunk: chunk}));
        const metaMessages: SaveImageToCloudMessage[] = createByteChunks(metaBytes, `${userFolder}/${imageId}/meta`, "json").map(chunk => ({metaFileChunk: chunk}));
        const commandsMessages: SaveImageToCloudMessage[] = createByteChunks(commandsBytes, `${userFolder}/${imageId}/commands`, "json").map(chunk => ({commandsFileChunk: chunk}));
        const fileInformationMessage: SaveImageToCloudMessage = {
            imageIdentification: {
                imageId, userFolder
            }
        };
        return [...imageMessages, ...metaMessages, ...commandsMessages, fileInformationMessage];
    }
}