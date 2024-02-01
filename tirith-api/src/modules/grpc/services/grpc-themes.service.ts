import { IThemesService } from "src/modules/palantir/services/themes.service.interface";
import { ThemeDataReply, ThemeListingReply, ThemeShareReply, ThemesDefinition } from "../proto-compiled/themes";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GrpcBaseService } from "./grpc-base.abstract";
import { ThemeListingDto, ThemeDto, ThemeShareDto } from "src/modules/palantir/dto/themes.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class GrpcThemessService extends GrpcBaseService<ThemesDefinition> implements IThemesService {

    constructor(config: ConfigService) {
        super(ThemesDefinition, config);
    }

    private themeListingReplyToDto(listing: ThemeListingReply): ThemeListingDto {
        return listing;
    }

    private themeDataReplyToDto(data: ThemeDataReply): ThemeDto {
        const theme = plainToInstance(ThemeDto, data.themeJson);
        return theme;
    }

    private themeShareReplyToDto(data: ThemeShareReply): ThemeShareDto {
        return data;
    }

    async getAllPublicThemes(): Promise<ThemeListingDto[]> {
        const themes = await this.collectFromAsyncIterable(this.grpcClient.getPublishedThemes({}));
        return themes.map(t => this.themeListingReplyToDto(t));
    }

    async getTheme(id: string): Promise<ThemeDto> {
        const theme = await this.grpcClient.getThemeById({ id, incrementDownloads: false });
        return this.themeDataReplyToDto(theme);
    }

    async getThemeAndUse(id: string): Promise<ThemeDto> {
        const theme = await this.grpcClient.getThemeById({ id, incrementDownloads: true });
        return this.themeDataReplyToDto(theme);
    }

    async shareTheme(theme: ThemeDto): Promise<ThemeShareDto> {
        const jsonString = JSON.stringify(theme);
        const result = await this.grpcClient.shareTheme({ themeJson: jsonString });
        return this.themeShareReplyToDto(result);
    }

    async publishTheme(id: string, ownerId: string): Promise<ThemeShareDto> {
        await this.grpcClient.publishTheme({ id, owner: ownerId });
        return { id };
    }

    async updatePublishedTheme(id: string, newId: string): Promise<ThemeShareDto> {
        await this.grpcClient.updateTheme({ id, newId });
        return { id };
    }
}