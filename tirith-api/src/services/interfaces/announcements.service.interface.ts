import {AnnouncementDto} from "../../modules/palantir/dto/announcement.dto";

export const IAnnouncementsService = Symbol("IAnnouncementsService");

export interface IAnnouncementsService {
    getAnnouncements(): Promise<AnnouncementDto[]>;
}