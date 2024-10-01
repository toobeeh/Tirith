/*
https://docs.nestjs.com/controllers#controllers
*/

import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Inject,
    Param, Patch,
    Post,
    Req,
    Request,
    UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import {ICloudService} from "../../../services/interfaces/cloud.service.interface";
import {CloudImageDto} from "../dto/cloud.dto";
import {CloudSearchDto} from "../dto/cloudSearch.dto";
import {AuthRoles, RequiredRole, ResourceOwner} from "../../../decorators/roles.decorator";
import {LoginTokenParamDto, NumberTokenParamDto, StringIdParamDto} from "../dto/params.dto";
import {MemberGuard} from "../../../guards/member.guard";
import {RoleGuard} from "../../../guards/role.guard";
import {Throttle} from "@nestjs/throttler";
import {getThrottleForDefinition} from "../../../guards/trottleConfigs";
import {CloudUploadDto} from "../dto/cloudUpload.dto";
import {IObjectStorageService} from "../../../services/interfaces/object-storage.service.interface";
import {MemberDto} from "../dto/member.dto";
import {CloudDeleteDto} from "../dto/cloudDelete.dto";
import {Long} from "@grpc/proto-loader";

@ApiSecurityNotes()
@Controller("cloud")
@ApiTags("cloud")
@UseGuards(MemberGuard, RoleGuard)
export class CloudController {

    constructor(@Inject(ICloudService) private cloudService: ICloudService, @Inject(IObjectStorageService) private objectStorageService: IObjectStorageService) { }

    @Get(":login/:id")
    @HttpCode(200)
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(AuthRoles.Member)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Get a image by id from the cloud" })
    @ApiResponse({ status: 200, type: CloudImageDto, description: "The image with specified ID" })
    getImageFromUserCloud(@Param() loginParam: LoginTokenParamDto, @Param() idParam: StringIdParamDto): Promise<CloudImageDto> {
        return this.cloudService.getImageFromCloud(loginParam.login, Long.fromString(idParam.id));
    }

    @Delete(":login/:id")
    @HttpCode(200)
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(AuthRoles.Member)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Delete a image by id from the cloud" })
    @ApiResponse({ status: 204, type: CloudImageDto, description: "The image with specified ID has been deleted" })
    async deleteImageFromUserCloud(@Req() request: Request, @Param() loginParam: LoginTokenParamDto, @Param() idParam: StringIdParamDto): Promise<void> {
        const member = (request as any).user as MemberDto

        await this.cloudService.removeImageFromCloud(loginParam.login, [Long.fromString(idParam.id)]);
        await this.objectStorageService.removeImagesFromCloud(member.discordID, [Long.fromString(idParam.id)]);
    }

    @Patch(":login/:id/award/:token")
    @Throttle(getThrottleForDefinition("throttleTenPerMinute"))
    @RequiredRole(AuthRoles.Member)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Link an image of the user to an award in their received inventory, which has no linked image yet" })
    @ApiResponse({ status: 200, description: "The image with specified ID has been linked to the award" })
    async linkImageToAward(@Param() loginParam: LoginTokenParamDto, @Param() idParam: StringIdParamDto, @Param() awardIdParam: NumberTokenParamDto): Promise<void> {
        await this.cloudService.linkImageToAward(loginParam.login, awardIdParam.token, Long.fromString(idParam.id));
    }

    @Post(":login/search")
    @HttpCode(200)
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(AuthRoles.Member)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Search for cloud images" })
    @ApiResponse({ status: 200, type: CloudImageDto, isArray: true, description: "All matching images of the current user's cloud" })
    searchUserCloud(@Param() params: LoginTokenParamDto, @Body() filter: CloudSearchDto): Promise<CloudImageDto[]> {
        console.log(JSON.stringify(filter));
        return this.cloudService.searchDrawings(params.login, filter);
    }

    @Post(":login/delete")
    @HttpCode(200)
    @Throttle(getThrottleForDefinition("throttleThirtyPerMinute"))
    @RequiredRole(AuthRoles.Member)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Delete multiple images from the user's cloud" })
    @ApiResponse({ status: 200 })
    async bulkDeleteFromUserCloud(@Req() request: Request, @Param() params: LoginTokenParamDto, @Body() body: CloudDeleteDto): Promise<void> {

        const member = (request as any).user as MemberDto
        const ids = body.ids.map(id => Long.fromString(id));
        await this.cloudService.removeImageFromCloud(params.login, ids);
        await this.objectStorageService.removeImagesFromCloud(member.discordID, ids);
        return;
    }

    @Post(":login")
    @Throttle(getThrottleForDefinition("throttleTenPerMinute"))
    @RequiredRole(AuthRoles.Member)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Upload a new image to the user's cloud" })
    @ApiResponse({ status: 201 })
    async uploadToUserCloud(@Req() request: Request, @Param() params: LoginTokenParamDto, @Body() image: CloudUploadDto): Promise<void> {

        const member = (request as any).user as MemberDto;
        const creationDate = new Date();
        const imageId = await this.cloudService.saveImageToCloud(image, params.login, creationDate);
        try {
            await this.objectStorageService.saveImageToCloud(Number(member.userLogin), member.userLogin, imageId, creationDate, image);
        }
        catch(e) {
            await this.cloudService.removeImageFromCloud(params.login, [imageId]);
            console.error(e);
            throw new Error("Failed to upload image to cloud");
        }

        return;
    }
}
