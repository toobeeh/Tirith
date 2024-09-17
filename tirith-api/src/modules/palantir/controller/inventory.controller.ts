/*
https://docs.nestjs.com/controllers#controllers
*/

import {Body, Controller, Get, Inject, Param, Patch, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import {AuthRoles, RequiredRole, ResourceOwner} from "../../../decorators/roles.decorator";
import {LoginTokenParamDto} from "../dto/params.dto";
import {RoleGuard} from "../../../guards/role.guard";
import {MemberGuard} from "../../../guards/member.guard";
import {SpriteComboDto, SpriteInventoryDto, SpriteSlotCountDto, SpriteSlotDto} from "../dto/inventory.dto";
import {IInventoryService} from "../../../services/interfaces/inventory.service.interface";
import {Throttle} from "@nestjs/throttler";
import {getThrottleForDefinition} from "../../../guards/trottleConfigs";

@ApiSecurityNotes()
@Controller("member")
@ApiTags("inventory")
@UseGuards(MemberGuard, RoleGuard)
export class InventoryController {

    constructor(@Inject(IInventoryService) private inventoryService: IInventoryService) { }

    @Patch(":login/inventory/sprites/combo")
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(AuthRoles.Moderator)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Set the sprite combo of a member" })
    @ApiResponse({ status: 200, description: "Combo has been successfully updated" })
    async setMemberSpriteCombo(@Param() login: LoginTokenParamDto, @Body() combo: SpriteComboDto): Promise<void> {
        await this.inventoryService.setSpriteSlots(login.login, combo.slots, true);
    }

    @Patch(":login/inventory/sprites/slot")
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(AuthRoles.Moderator)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Set a sprite slot of a member" })
    @ApiResponse({ status: 200, description: "Slot has been successfully updated" })
    async setMemberSpriteSlot(@Param() login: LoginTokenParamDto, @Body() slot: SpriteSlotDto): Promise<void> {
        await this.inventoryService.setSpriteSlots(login.login, [slot], false);
    }

    @Get(":login/inventory/sprites")
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(AuthRoles.Moderator)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Get all sprites in the inventory of a member" })
    @ApiResponse({ status: 200, type: SpriteInventoryDto, isArray: true, description: "All sprites in the inventory, and the slot where they are activated" })
    async getMemberSpriteInventory(@Param() loginParam: LoginTokenParamDto): Promise<SpriteInventoryDto[]> {
        return this.inventoryService.getSpriteInventory(loginParam.login);
    }

    @Get(":login/inventory/sprites/slots")
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(AuthRoles.Moderator)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Get the amount of unlocked sprite slots of a member" })
    @ApiResponse({ status: 200, description: "Amount of unlocked sprite slots", type: SpriteSlotCountDto })
    async getMemberSpriteSlotCount(@Param() login: LoginTokenParamDto): Promise<SpriteSlotCountDto> {
        const slots = await this.inventoryService.getSpriteSlotCount(login.login);
        return { unlockedSlots: slots };
    }
}
