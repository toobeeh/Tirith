/*
https://docs.nestjs.com/controllers#controllers
*/

import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Query,
    Req,
    Request,
    UseGuards, UseInterceptors
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ApiSecurityNotes} from 'src/decorators/apiSecurityNote.decorator';
import {IEmojisService} from "../../../services/interfaces/emojis.service.interface";
import {EmojiCandidateDto, EmojiDto, EmojiSearchDto, NameIdDto} from "../dto/emojis.dto";
import {StringIdParamDto} from "../dto/params.dto";
import {MemberGuard} from "../../../guards/member.guard";
import {RoleGuard} from "../../../guards/role.guard";
import {RequiredRole} from "../../../decorators/roles.decorator";
import {Throttle} from "@nestjs/throttler";
import {getThrottleForDefinition} from "../../../guards/trottleConfigs";
import {MemberDto, MemberFlagDto} from "../dto/member.dto";
import {OkCacheInterceptor} from "../../../interceptors/ok-cache.interceptor";
import {RequiredScope, TypoScopes} from "../../../decorators/scopes.decorator";

@ApiSecurityNotes()
@Controller("emojis")
@ApiTags("emojis")
export class EmojisController {

    constructor(@Inject(IEmojisService) private service: IEmojisService) { }

    @Get("/cache")
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @ApiOperation({ summary: "Search all emojis with cache enabled" })
    @UseInterceptors(OkCacheInterceptor)
    @ApiResponse({ status: 200, type: EmojiDto, isArray: true, description: "All available emojis that match search criteria" })
    getAllEmojisCached(@Query() search: EmojiSearchDto): Promise<EmojiDto[]> {
        return this.service.searchSavedEmojis(search.query ?? "", search.limit, search.animated, search.statics);
    }

    @Get()
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @ApiOperation({ summary: "Search all emojis" })
    @ApiResponse({ status: 200, type: EmojiDto, isArray: true, description: "All available emojis that match search criteria" })
    getAllEmojis(@Query() search: EmojiSearchDto): Promise<EmojiDto[]> {
        return this.service.searchSavedEmojis(search.query ?? "", search.limit, search.animated, search.statics);
    }

    @Get("/discover")
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @UseGuards(MemberGuard, RoleGuard)
    @RequiredRole(MemberFlagDto.Admin, MemberFlagDto.EmojiManagement, MemberFlagDto.ContentModerator)
    @RequiredScope(TypoScopes.emojisWrite)
    @ApiOperation({ summary: "Search for new emojis that are not yet in the database" })
    @ApiResponse({ status: 200, type: EmojiDto, isArray: true, description: "All available emojis from a foreign source that are not added yet and match search criteria" })
    getNewEmojis(@Query() search: EmojiSearchDto): Promise<EmojiDto[]> {

        if(search.limit > 1000){
            throw new BadRequestException("Limit cannot be higher than 100");
        }

        return this.service.searchNewEmojis(search.query ?? "", search.limit, search.animated, search.statics);
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a single saved emoji by name (id) and nameId" })
    @ApiResponse({ status: 200, type: EmojiDto, description: "An emoji that matches provided id" })
    getEmoji(@Param() idParam: StringIdParamDto, @Query() nameIdQuery: NameIdDto): Promise<EmojiDto> {
        return this.service.getEmoji(idParam.id, nameIdQuery.nameId ?? 0);
    }

    @Delete(":id")
    @UseGuards(MemberGuard, RoleGuard)
    @RequiredRole(MemberFlagDto.Admin, MemberFlagDto.ContentModerator, MemberFlagDto.Moderator)
    @RequiredScope(TypoScopes.emojisWrite)
    @ApiOperation({ summary: "Delete a saved emoji  by name (id) and nameId" })
    @ApiResponse({ status: 204, description: "Emoji has been deleted" })
    deleteEmoji(@Param() idParam: StringIdParamDto, @Query() nameIdQuery: NameIdDto): Promise<void> {
        return this.service.deleteEmoji(idParam.id, nameIdQuery.nameId ?? 0);
    }

    @Post()
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @UseGuards(MemberGuard, RoleGuard)
    @RequiredRole(MemberFlagDto.Admin, MemberFlagDto.EmojiManagement, MemberFlagDto.ContentModerator)
    @RequiredScope(TypoScopes.emojisWrite)
    @ApiOperation({ summary: "Add a new emoji" })
    @ApiResponse({ status: 201, type: EmojiDto, description: "Emoji has been added" })
    addEmoji(@Body() emoji: EmojiCandidateDto, @Req() request: Request): Promise<EmojiDto> {
        const username = ((request as any).user as MemberDto).userName;
        console.log(`${username} added emoji ${emoji.name}`);
        return this.service.saveEmoji(emoji);
    }
}
