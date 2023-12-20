/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PalantirdbService } from './palantirdb.service';
import { UserThemes } from 'palantir-db/dist/src/schema';
import { plainToInstance } from 'class-transformer';
import { ThemeDto, ThemeListingDto, ThemeShareDto } from 'src/modules/palantir/dto/themes.dto';

@Injectable()
export class ThemesService {

    private get database() { return this.databaseService.database; }

    constructor(private databaseService: PalantirdbService) { }

    private getRandomId(length = 8): string {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
            const randomIndex: number = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return randomString;
    }

    private mapThemeJsonToThemeDto(json: string) {
        const theme = plainToInstance(ThemeDto, JSON.parse(json), { excludeExtraneousValues: true });
        return theme;
    }

    private async mapUserThemesToListingDto(theme: UserThemes): Promise<ThemeListingDto> {

        const id = theme.ID;
        const themeContent = await this.database.getTheme(id);
        if (themeContent.success === false) throw new HttpException("Theme not found", HttpStatus.NOT_FOUND);
        const contentDto = this.mapThemeJsonToThemeDto(themeContent.result);

        return {
            name: contentDto.meta.name,
            downloads: theme.Downloads,
            version: theme.Version,
            author: contentDto.meta.author,
            id: theme.ID
        };
    }

    async getAllPublicThemes(): Promise<ThemeListingDto[]> {
        const themes = await this.database.getAllPublishedThemes();

        return (await Promise.all(
            themes.result.map(theme => this.mapUserThemesToListingDto(theme))
        )).sort((a, b) => b.downloads - a.downloads);
    }

    async getThemeById(id: string): Promise<ThemeDto> {
        const theme = await this.database.getTheme(id);
        if (!theme.success) throw new HttpException("Theme not found", HttpStatus.NOT_FOUND);
        return this.mapThemeJsonToThemeDto(theme.result);
    }

    async getThemeByIdAndUse(id: string): Promise<ThemeDto> {
        const used = await this.database.incrementThemeUses(id);
        if (!used.success) throw new HttpException("Public theme not found", HttpStatus.NOT_FOUND);

        return this.getThemeById(id);
    }

    async shareTheme(theme: ThemeDto): Promise<ThemeShareDto> {
        const id = this.getRandomId();
        const share = await this.database.shareTheme(id, JSON.stringify(theme));
        if (!share.success) throw new HttpException("Could not share theme", HttpStatus.INTERNAL_SERVER_ERROR);

        return { id: id };
    }

    async publishTheme(id: string, ownerId: string): Promise<ThemeShareDto> {
        const result = await this.database.publishTheme(id, ownerId);
        if (!result.success) throw new HttpException("Could not publish theme", HttpStatus.INTERNAL_SERVER_ERROR);

        return { id: id };
    }

    async updatePublishedTheme(id: string, newId: string): Promise<ThemeShareDto> {

        const newTheme = await this.database.getTheme(newId);
        if (!newTheme.success) throw new HttpException("Could not load new theme content", HttpStatus.NOT_FOUND);

        if (id == newId) throw new HttpException("New theme is the same", HttpStatus.NOT_MODIFIED)

        const result = await this.database.updatePublishedTheme(id, newTheme.result);
        if (!result.success) throw new HttpException("Could not update published theme", HttpStatus.INTERNAL_SERVER_ERROR);

        return { id: id };
    }
}
