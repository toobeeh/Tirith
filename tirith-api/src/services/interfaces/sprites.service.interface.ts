import { SpriteDto } from "../../modules/palantir/dto/sprites.dto";

export const ISpritesService = Symbol("ISpritesService");

export interface ISpritesService {

    /**
     * Get all available sprites
     */
    getAllSprites(): Promise<SpriteDto[]>;

    /**
     * Get a sprite 
     * @param id the sprite id
     */
    getSprite(id: number): Promise<SpriteDto>;
}