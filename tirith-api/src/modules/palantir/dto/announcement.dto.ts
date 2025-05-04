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

    @XApiProperty({ description: "Version of typo which this targets", required: false })
    affectedTypoVersion?: string;

    @XApiProperty({ description: "Announcement creation ms" })
    date: string;

    @XApiProperty({ description: "Announcement type", enum: AnnouncementTypeEnum })
    type: AnnouncementTypeEnum;

    @XApiProperty({ description: "Details of the announcement in markdown", required: false })
    details?: string;
}