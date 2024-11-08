import {XApiProperty} from "../../../decorators/apiProperty.decorator";
import {SceneInventoryItemReply} from "../../grpc/proto-compiled/inventory";

export class SpriteSlotDto {

    @XApiProperty({ description: "A sprite slot number, starting at 1" })
    slotId: number;

    @XApiProperty({ description: "The target sprite Id, undefined to use no sprite", required: false })
    spriteId?: number;
}

export class SpriteComboDto {

    @XApiProperty({ description: "The sprite slots that will be the new user sprite combo", type: () => SpriteSlotDto, isArray: true })
    slots: SpriteSlotDto[];
}

export class SpriteInventoryDto {

    @XApiProperty({ description: "A sprite slot number, starting at 1, or undefined if sprite is not active", required: false })
    slot?: number;

    @XApiProperty({ description: "A sprite Id" })
    spriteId: number;

    @XApiProperty({ description: "A rainbow sprite color shift", required: false })
    colorShift?: number;
}

export class SpriteSlotCountDto {

    @XApiProperty({ description: "The amount of unlocked srite slots" })
    unlockedSlots: number;
}

export class SceneInventoryDto {

    @XApiProperty({ description: "The activated scene Id", required: false })
    activeId?: number;

    @XApiProperty({ description: "The activated scene theme Id", required: false })
    activeShift?: number;

    @XApiProperty({ description: "The scenes in the inventory", type: () => SceneInventoryItemDto, isArray: true })
    scenes: SceneInventoryItemDto[];
}

export class SceneInventoryItemDto {

    @XApiProperty({ description: "A scene Id" })
    sceneId: number;

    @XApiProperty({ description: "A scene theme shift identification", required: false })
    sceneShift?: number;
}

export class SetActiveSceneDto {

    @XApiProperty({ description: "The scene to activate", required: false })
    scene?: SceneInventoryItemDto;
}