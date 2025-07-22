/*
https://docs.nestjs.com/controllers#controllers
*/

import {Body, Controller, Get, Inject, Param, Patch, UseGuards} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ApiSecurityNotes} from 'src/decorators/apiSecurityNote.decorator';
import {RequiredRole, ResourceOwner} from "../../../decorators/roles.decorator";
import {LoginTokenParamDto} from "../dto/params.dto";
import {RoleGuard} from "../../../guards/role.guard";
import {MemberGuard} from "../../../guards/member.guard";
import {
    SceneInventoryDto, SceneInventoryItemDto, SetActiveSceneDto,
    SpriteComboDto,
    SpriteInventoryDto,
    SpriteSlotCountDto,
    SpriteSlotDto
} from "../dto/inventory.dto";
import {IInventoryService} from "../../../services/interfaces/inventory.service.interface";
import {Throttle} from "@nestjs/throttler";
import {getThrottleForDefinition} from "../../../guards/trottleConfigs";
import {MemberFlagDto} from "../dto/member.dto";
import {AwardInventoryDto} from "../dto/awards.dto";
import {RequiredScope, TypoScopes} from "../../../decorators/scopes.decorator";

@ApiSecurityNotes()
@Controller("member")
@ApiTags("inventory")
@UseGuards(MemberGuard, RoleGuard)
export class InventoryController {

    constructor(@Inject(IInventoryService) private inventoryService: IInventoryService) { }

    @Patch(":login/inventory/sprites/combo")
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(MemberFlagDto.Moderator)
    @RequiredScope(TypoScopes.spritesWrite)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Set the sprite combo of a member" })
    @ApiResponse({ status: 200, description: "Combo has been successfully updated" })
    async setMemberSpriteCombo(@Param() login: LoginTokenParamDto, @Body() combo: SpriteComboDto): Promise<void> {
        await this.inventoryService.setSpriteSlots(login.login, combo.slots, true);
    }

    @Patch(":login/inventory/sprites/slot")
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(MemberFlagDto.Moderator)
    @RequiredScope(TypoScopes.spritesWrite)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Set a sprite slot of a member" })
    @ApiResponse({ status: 200, description: "Slot has been successfully updated" })
    async setMemberSpriteSlot(@Param() login: LoginTokenParamDto, @Body() slot: SpriteSlotDto): Promise<void> {
        await this.inventoryService.setSpriteSlots(login.login, [slot], false);
    }

    @Get(":login/inventory/sprites")
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(MemberFlagDto.Moderator)
    @RequiredScope(TypoScopes.spritesRead)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Get all sprites in the inventory of a member" })
    @ApiResponse({ status: 200, type: SpriteInventoryDto, isArray: true, description: "All sprites in the inventory, and the slot where they are activated" })
    async getMemberSpriteInventory(@Param() loginParam: LoginTokenParamDto): Promise<SpriteInventoryDto[]> {
        return this.inventoryService.getSpriteInventory(loginParam.login);
    }

    @Get(":login/inventory/sprites/slots")
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(MemberFlagDto.Moderator)
    @RequiredScope(TypoScopes.spritesRead)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Get the amount of unlocked sprite slots of a member" })
    @ApiResponse({ status: 200, description: "Amount of unlocked sprite slots", type: SpriteSlotCountDto })
    async getMemberSpriteSlotCount(@Param() login: LoginTokenParamDto): Promise<SpriteSlotCountDto> {
        const slots = await this.inventoryService.getSpriteSlotCount(login.login);
        return { unlockedSlots: slots };
    }

    @Get(":login/inventory/scenes")
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(MemberFlagDto.Moderator)
    @RequiredScope(TypoScopes.scenesRead)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Get all scenes in the inventory of a member, and the currently activated scene" })
    @ApiResponse({ status: 200, type: SceneInventoryDto, description: "All scenes in the inventory, and the activated id and theme" })
    async getMemberSceneInventory(@Param() loginParam: LoginTokenParamDto): Promise<SceneInventoryDto> {
        return this.inventoryService.getSceneInventory(loginParam.login);
    }

    @Patch(":login/inventory/scenes")
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(MemberFlagDto.Moderator)
    @RequiredScope(TypoScopes.scenesWrite)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Set the activated scene for a member" })
    @ApiResponse({ status: 200, description: "Scene has been successfully updated" })
    async setMemberScene(@Param() login: LoginTokenParamDto, @Body() scene: SetActiveSceneDto): Promise<void> {
        await this.inventoryService.useScene(login.login, scene.scene?.sceneId, scene.scene?.sceneShift);
    }

    @Get(":login/inventory/awards/available")
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(MemberFlagDto.Moderator)
    @RequiredScope(TypoScopes.awardsRead)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Get all awards in the inventory of a member which are available to gift" })
    @ApiResponse({ status: 200, type: AwardInventoryDto, isArray: true, description: "All awards in the inventory, with the amount of how many are available" })
    async getMemberAvailableAwardInventory(@Param() loginParam: LoginTokenParamDto): Promise<AwardInventoryDto[]> {
        return this.inventoryService.getAvailableAwardInventory(loginParam.login);
    }
}
