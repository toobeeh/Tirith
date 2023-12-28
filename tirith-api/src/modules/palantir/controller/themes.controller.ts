/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpriteDto } from '../dto/sprites.dto';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { ThemeDto, ThemeListingDto, ThemePublishRequestDto, ThemeShareDto, ThemeUpdateRequestDto } from '../dto/themes.dto';
import { RequiredRole, AuthRoles } from 'src/decorators/roles.decorator';
import { MemberGuard } from 'src/guards/member.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Throttle } from '@nestjs/throttler';
import { StringIdParamDto } from '../dto/params.dto';
import { getThrottleForDefinition } from 'src/guards/trottleConfigs';
import { IThemesService } from '../service/themes.service.interface';

@ApiSecurityNotes()
@Controller("themes")
@ApiTags("themes")
export class ThemesController {

    constructor(@Inject(IThemesService) private service: IThemesService) { }

    @Get()
    @ApiOperation({ summary: "Get all published themes" })
    @ApiResponse({ status: 200, type: ThemeListingDto, isArray: true, description: "An array containing all public themes" })
    async getAllThemes(): Promise<ThemeListingDto[]> {
        return this.service.getAllPublicThemes();
    }

    @Post("share")
    @ApiOperation({ summary: "Share a theme to be used by others" })
    @ApiResponse({ status: 201, type: ThemeShareDto, description: "The newly created theme with id" })
    async shareTheme(@Body() theme: ThemeDto): Promise<ThemeShareDto> {
        return this.service.shareTheme(theme);
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a theme by ID" })
    @ApiResponse({ status: 200, type: ThemeDto, description: "The theme that matches the given ID" })
    async getThemeById(@Param() params: StringIdParamDto): Promise<ThemeDto> {
        return this.service.getTheme(params.id);
    }

    @Get(":id/use")
    @Throttle(getThrottleForDefinition("throttleFivePerFiveHours"))
    @ApiOperation({ summary: "Get a theme by ID and increment use counter" })
    @ApiResponse({ status: 200, type: ThemeDto, description: "The theme that matches the given ID" })
    async useThemeById(@Param() params: StringIdParamDto): Promise<ThemeDto> {
        return this.service.getThemeAndUse(params.id);
    }

    @Post(":id/public")
    @UseGuards(MemberGuard, RoleGuard)
    @RequiredRole(AuthRoles.Moderator)
    @ApiOperation({ summary: "Publish a theme to the public theme list" })
    @ApiResponse({ status: 201, type: ThemeShareDto, description: "The newly created theme with id" })
    async publishTheme(@Param() params: StringIdParamDto, @Body() publish: ThemePublishRequestDto): Promise<ThemeShareDto> {
        return this.service.publishTheme(params.id, publish.owner);
    }

    @Patch(":id/public")
    @UseGuards(MemberGuard, RoleGuard)
    @RequiredRole(AuthRoles.Moderator)
    @ApiOperation({ summary: "Update the theme content from the provided new share and increment version" })
    @ApiResponse({ status: 200, type: ThemeShareDto, description: "The newly created theme with id" })
    async updateTheme(@Param() params: StringIdParamDto, @Body() update: ThemeUpdateRequestDto): Promise<ThemeShareDto> {
        return this.service.updatePublishedTheme(params.id, update.newId);
    }
}
