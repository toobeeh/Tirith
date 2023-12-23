import { SceneDto } from "../dto/scenes.dto";

export const IScenesService = Symbol("IScenesService");

export interface IScenesService {

    /**
     * Get all available scenes
     */
    getAllScenes(): Promise<SceneDto[]>;

    /**
     * Get a scene 
     * @param id the scene id
     */
    getScene(id: number): Promise<SceneDto>;
}