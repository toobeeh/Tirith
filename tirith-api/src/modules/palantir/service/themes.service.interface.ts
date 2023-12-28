import { ThemeDto, ThemeListingDto, ThemeShareDto } from "../dto/themes.dto";

export const IThemesService = Symbol("IThemesService");

export interface IThemesService {

    /**
     * Get all available Themes
     */
    getAllPublicThemes(): Promise<ThemeListingDto[]>;

    /**
     * Get a Theme 
     * @param id the Theme id
     */
    getTheme(id: string): Promise<ThemeDto>;

    /**
     * Get a Theme and increments the download counter
     * @param id the Theme id
     */
    getThemeAndUse(id: string): Promise<ThemeDto>;

    /**
     * Uploads a theme and gets its share id
     * @param theme the Theme json
     */
    shareTheme(theme: ThemeDto): Promise<ThemeShareDto>;

    /**
     * Publishes a theme with given id and owner id
     * @param id the Theme share id
     * @param ownerId the Theme owner id
     */
    publishTheme(id: string, ownerId: string): Promise<ThemeShareDto>;


    /**
     * Updates the theme json of the original share to the content of the new share id
     * @param id the original Theme share id
     * @param newId the new Theme share id
     */
    updatePublishedTheme(id: string, newId: string): Promise<ThemeShareDto>;
}