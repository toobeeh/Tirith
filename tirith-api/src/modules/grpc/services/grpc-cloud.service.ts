import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {GrpcBaseService} from "./grpc-base";
import {CloudDefinition, CloudImageMessage, SearchCloudMessage} from "../proto-compiled/cloud";
import {ICloudService} from "../../../services/interfaces/cloud.service.interface";
import {CloudImageDto} from "../../palantir/dto/cloud.dto";
import {CloudSearchDto} from "../../palantir/dto/cloudSearch.dto";
import {Long} from "@grpc/proto-loader";
import {CloudUploadDto} from "../../palantir/dto/cloudUpload.dto";

@Injectable()
export class GrpcCloudService extends GrpcBaseService<CloudDefinition> implements ICloudService {

    constructor(config: ConfigService) {
        super(CloudDefinition, config);
    }

    private cloudMessageToDto(reply: CloudImageMessage): CloudImageDto {
        return {
            metaUrl: reply.metaUrl,
            commandsUrl: reply.commandsUrl,
            imageUrl: reply.imageUrl,
            createdAt: reply.tags.createdAt.toString(),
            name: reply.tags.title,
            author: reply.tags.author,
            id: reply.id.toString()
        };
    }

    private cloudSearchDtoToMessage(login: number, dto: CloudSearchDto): SearchCloudMessage {
        return {
            pageSize: dto.pageSize,
            page: dto.page,
            ownerLogin: login,
            authorQuery: dto.authorQuery,
            languageQuery: dto.languageQuery,
            createdBeforeQuery: dto.createdBeforeQuery ? Long.fromString(dto.createdBeforeQuery) : undefined,
            createdAfterQuery:  dto.createdAfterQuery ? Long.fromString(dto.createdAfterQuery) : undefined,
            createdInPrivateLobbyQuery: dto.createdInPrivateLobbyQuery,
            isOwnQuery: dto.isOwnQuery,
            titleQuery: dto.titleQuery
        };
    }

    async searchDrawings(login: number, filter: CloudSearchDto): Promise<CloudImageDto[]> {
        const search = this.cloudSearchDtoToMessage(login, filter);
        const results = await this.collectFromAsyncIterable(this.grpcClient.searchCloud(search));
        return results.map(t => this.cloudMessageToDto(t));
    }

    async removeImageFromCloud(ownerLogin: number, ids: Long[]): Promise<void> {
        await this.grpcClient.deleteCloudTags({ids, ownerLogin});
    }

    async getImageFromCloud(ownerLogin: number, id: Long): Promise<CloudImageDto> {
        const response = await this.grpcClient.getCloudTagsById({id, ownerLogin});
        return this.cloudMessageToDto(response);
    }

    async saveImageToCloud(data: CloudUploadDto, ownerLogin: number, creationDate: Date): Promise<Long> {
        const response = await this.grpcClient.saveCloudTags({
            title: data.name,
            author: data.author,
            isOwn: data.isOwn,
            createdInPrivateLobby: data.inPrivate,
            createdAt: Long.fromValue(creationDate.getTime()),
            ownerLogin,
            language: data.language
        });

        return response.id;
    }
}