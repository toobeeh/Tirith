import {Inject, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {GrpcBaseService} from "./grpc-base";
import {IInventoryService} from "../../../services/interfaces/inventory.service.interface";
import {InventoryDefinition, SpriteSlotConfigurationReply} from "../proto-compiled/inventory";
import {SceneInventoryDto, SpriteInventoryDto, SpriteSlotDto} from "../../palantir/dto/inventory.dto";
import {AwardInventoryDto} from "../../palantir/dto/awards.dto";
import {IAwardsService} from "../../../services/interfaces/awards.service.interface";

@Injectable()
export class GrpcInventoryService extends GrpcBaseService<InventoryDefinition> implements IInventoryService {

    constructor(config: ConfigService, @Inject(IAwardsService) private _awardsService: IAwardsService) {
        super(InventoryDefinition, config);
    }

    private spriteInventoryReplyToDto(reply: SpriteSlotConfigurationReply): SpriteInventoryDto {
        return {
            ...reply,
            slot: reply.slot == 0 ? undefined : reply.slot
        }
    }


    async getSpriteInventory(login: number): Promise<SpriteInventoryDto[]> {
        const sprites = await this.collectFromMappedAsyncIterable(this.grpcClient.getSpriteInventory({login}), item => this.spriteInventoryReplyToDto(item));
        return sprites;
    }

    async setSpriteSlots(login: number, slots: SpriteSlotDto[], overwriteOther: boolean): Promise<void> {
        await this.grpcClient.useSpriteCombo({
            login,
            clearOtherSlots: overwriteOther,
            combo: slots.map(slot => ({spriteId: slot.spriteId, slotId: slot.slotId}))
        });
    }

    async getSpriteSlotCount(login: number): Promise<number> {
        const count = await this.grpcClient.getSpriteSlotCount({login});
        return count.unlockedSlots;
    }

    async getSceneInventory(login: number): Promise<SceneInventoryDto> {
        const scenes = await this.grpcClient.getSceneInventory({login});
        return scenes;
    }

    async useScene(login: number, sceneId: number | undefined, sceneShift: number | undefined): Promise<void> {
        await this.grpcClient.useScene({login, sceneId, sceneShift});
    }

    async getAvailableAwardInventory(login: number): Promise<AwardInventoryDto[]> {
        const awardInventory = await this.grpcClient.getAwardInventory({login});
        const awards = await this._awardsService.getAllAwards();
        const available: AwardInventoryDto[] = [];

        for (const award of awards) {
            const ids = awardInventory.availableAwards
                .filter(a => a.awardId == award.id)
                .map(a => a.inventoryId);
            if (ids.length > 0) {
                available.push({award, inventoryIds: ids});
            }
        }

        return available;
    }
}