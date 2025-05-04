import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {GrpcBaseService} from "./grpc-base";
import {AnnouncementMessage, AnnouncementsDefinition, AnnouncementType} from "../proto-compiled/announcements";
import {IAnnouncementsService} from "../../../services/interfaces/announcements.service.interface";
import {AnnouncementDto, AnnouncementTypeEnum} from "../../palantir/dto/announcement.dto";

@Injectable()
export class GrpcAnnouncementsService extends GrpcBaseService<AnnouncementsDefinition> implements IAnnouncementsService {

    constructor(config: ConfigService) {
        super(AnnouncementsDefinition, config);
    }

    private mapMessageToDto(message: AnnouncementMessage): AnnouncementDto {
        return {
            title: message.title,
            content: message.content,
            date: message.date.getTime().toString(),
            affectedTypoVersion: message.affectedTypoVersion,
            type: message.type === AnnouncementType.Announcement ? AnnouncementTypeEnum.Announcement : AnnouncementTypeEnum.Changelog,
            details: message.details
        }
    }

    async getAnnouncements(): Promise<AnnouncementDto[]> {
        const announcements = await this.collectFromMappedAsyncIterable(this.grpcClient.getAllAnnouncements({}), a => this.mapMessageToDto(a));
        return announcements;
    }
}