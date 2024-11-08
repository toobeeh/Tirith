import {SceneInventoryDto, SpriteInventoryDto, SpriteSlotDto} from "../../modules/palantir/dto/inventory.dto";

export const IInventoryService = Symbol("IInventoryService");

export interface IInventoryService {

    getSpriteInventory(login: number): Promise<SpriteInventoryDto[]>;

    setSpriteSlots(login: number, slots: SpriteSlotDto[], overwriteOther: boolean): Promise<void>;

    getSpriteSlotCount(login: number): Promise<number>;

    getSceneInventory(login: number): Promise<SceneInventoryDto>;

    useScene(login: number, sceneId: number | undefined, sceneShift: number | undefined): Promise<void>;
}