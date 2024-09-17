import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {GrpcBaseService} from "./grpc-base";
import {IInventoryService} from "../../../services/interfaces/inventory.service.interface";
import {InventoryDefinition, SpriteSlotConfigurationReply} from "../proto-compiled/inventory";
import {SpriteInventoryDto, SpriteSlotDto} from "../../palantir/dto/inventory.dto";

@Injectable()
export class GrpcInventoryService extends GrpcBaseService<InventoryDefinition> implements IInventoryService {

    constructor(config: ConfigService) {
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
}