/*
https://docs.nestjs.com/controllers#controllers
*/

import {Controller, Get, Inject } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ApiSecurityNotes} from 'src/decorators/apiSecurityNote.decorator';
import {AnnouncementDto} from "../dto/announcement.dto";
import {IAnnouncementsService} from "../../../services/interfaces/announcements.service.interface";

@ApiSecurityNotes()
@Controller("announcements")
@ApiTags("announcements")
export class AnnouncementsController {

    constructor(@Inject(IAnnouncementsService) private service: IAnnouncementsService) { }

    @Get()
    @ApiOperation({ summary: "Get all announcements" })
    @ApiResponse({ description: "All announcements", type: AnnouncementDto, isArray: true })
    getAnnouncements(): Promise<AnnouncementDto[]> {
        return this.service.getAnnouncements();
    }
}
