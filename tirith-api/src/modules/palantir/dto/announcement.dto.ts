import { XApiProperty } from "src/decorators/apiProperty.decorator";

export enum AnnouncementTypeEnum {
    Announcement = "Announcement",
    Changelog = "Changelog"
}

export class AnnouncementDto {

    @XApiProperty({ description: "Announcement title" })
    title: string;

    @XApiProperty({ description: "Announcement content" })
    content: string;

    @XApiProperty({ description: "Announcement type", required: false })
    affectedTypoVersion?: string;

    @XApiProperty({ description: "Announcement creation ms" })
    date: string;

    @XApiProperty({ description: "Announcement type", enum: AnnouncementTypeEnum })
    type: AnnouncementTypeEnum;
}