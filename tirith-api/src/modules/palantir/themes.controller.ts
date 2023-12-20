/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpriteDto } from './dto/sprites.dto';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { ThemeDto, ThemeListingDto, ThemePublishRequestDto, ThemeShareDto, ThemeUpdateRequestDto } from './dto/themes.dto';
import { ThemesService } from 'src/services/themes.service';
import { RequiredRole, AuthRoles } from 'src/decorators/roles.decorator';
import { MemberGuard } from 'src/guards/member.guard';
import { AuthentificationGuard } from 'src/guards/authentification.guard';

@ApiSecurityNotes()
@Controller("themes")
@ApiTags("themes")
export class ThemesController {

    constructor(private service: ThemesService) { }

    @Get()
    @ApiOperation({ summary: "Get all published themes" })
    @ApiResponse({ status: 200, type: ThemeListingDto, isArray: true, description: "An array containing all public themes" })
    async getAllThemes(): Promise<ThemeListingDto[]> {
        return this.service.getAllPublicThemes();
    }

    @Post("share")
    @ApiOperation({ summary: "Share a theme to be used by others" })
    @ApiResponse({ status: 200, type: ThemeShareDto, description: "The newly created theme with id" })
    async shareTheme(@Body() theme: ThemeDto): Promise<ThemeShareDto> {
        return this.service.shareTheme(theme);
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a theme by ID" })
    @ApiResponse({ status: 200, type: ThemeDto, description: "The theme that matches the given ID" })
    async getThemeById(@Param('id') id: string): Promise<ThemeDto> {
        return this.service.getThemeById(id);
    }

    @Get(":id/use")
    @ApiOperation({ summary: "Get a theme by ID and increment use counter" })
    @ApiResponse({ status: 200, type: ThemeDto, description: "The theme that matches the given ID" })
    async useThemeById(@Param('id') id: string): Promise<ThemeDto> {
        return this.service.getThemeByIdAndUse(id);
    }

    @Post(":id/public")
    @UseGuards(MemberGuard, AuthentificationGuard)
    @ApiBearerAuth()
    @RequiredRole(AuthRoles.Moderator)
    @ApiOperation({ summary: "Publish a theme to the public theme list" })
    @ApiResponse({ status: 200, type: SpriteDto, description: "The newly created theme with id" })
    async publishTheme(@Param('id') id: string, @Body() publish: ThemePublishRequestDto): Promise<ThemeShareDto> {
        return this.service.publishTheme(id, publish.owner);
    }

    @Patch(":id/public")
    @UseGuards(MemberGuard, AuthentificationGuard)
    @ApiBearerAuth()
    @RequiredRole(AuthRoles.Moderator)
    @ApiOperation({ summary: "Update the theme content from the provided new share and increment version" })
    @ApiResponse({ status: 200, type: SpriteDto, description: "The newly created theme with id" })
    async updateTheme(@Param('id') id: string, @Body() update: ThemeUpdateRequestDto): Promise<ThemeShareDto> {
        return this.service.updatePublishedTheme(id, update.newId);
    }
}
