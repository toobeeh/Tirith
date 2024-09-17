import {SpriteInventoryDto, SpriteSlotDto} from "../../modules/palantir/dto/inventory.dto";

export const IInventoryService = Symbol("IInventoryService");

export interface IInventoryService {

    getSpriteInventory(login: number): Promise<SpriteInventoryDto[]>;

    setSpriteSlots(login: number, slots: SpriteSlotDto[], overwriteOther: boolean): Promise<void>;
}