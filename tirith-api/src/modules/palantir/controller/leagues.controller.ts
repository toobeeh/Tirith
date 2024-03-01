/*
https://docs.nestjs.com/controllers#controllers
*/

import {Controller, Get, Inject, Param, Patch, Req, Request, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AwardDto } from '../dto/awards.dto';
import { ApiSecurityNotes } from 'src/decorators/apiSecurityNote.decorator';
import { IAwardsService } from '../../../services/interfaces/awards.service.interface';
import {IAdminService} from "../../../services/interfaces/admin.service.interface";
import {ILeaguesService} from "../../../services/interfaces/leagues.service.interface";
import {AuthRoles, RequiredRole, ResourceOwner} from "../../../decorators/roles.decorator";
import {MemberDto} from "../dto/member.dto";
import {
    LeagueSeasonEvaluationDto,
    LeagueSeasonMemberEvaluationDto,
    SeasonMonthParamDto,
    SeasonYearParamDto
} from "../dto/leagues.dto";
import {LoginTokenParamDto} from "../dto/params.dto";
import {RoleGuard} from "../../../guards/role.guard";
import {MemberGuard} from "../../../guards/member.guard";

@ApiSecurityNotes()
@Controller("leagues")
@ApiTags("leagues")
@UseGuards(MemberGuard, RoleGuard)
export class LeaguesController {

    constructor(@Inject(ILeaguesService) private service: ILeaguesService) { }

    @Get("member/:login")
    @RequiredRole(AuthRoles.Moderator)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Get the ranking of a single member of the current league season" })
    @ApiResponse({ status: 200, type: LeagueSeasonMemberEvaluationDto, description: "Ranking stats for a single member" })
    async evaluateMemberCurrentLeagueSeason(@Param() login: LoginTokenParamDto): Promise<LeagueSeasonMemberEvaluationDto> {
        return this.service.evaluateMemberCurrentLeagueSeason(login.login);
    }

    @Get(":year/:month/member/:login")
    @RequiredRole(AuthRoles.Moderator)
    @ResourceOwner("login")
    @ApiOperation({ summary: "Get the ranking of a single member of the specified league season" })
    @ApiResponse({ status: 200, type: LeagueSeasonMemberEvaluationDto, description: "Ranking stats for a single member" })
    async evaluateMemberLeagueSeason(@Param() login: LoginTokenParamDto, @Param() year: SeasonYearParamDto, @Param() month: SeasonMonthParamDto): Promise<LeagueSeasonMemberEvaluationDto> {
        return this.service.evaluateMemberLeagueSeason(login.login, year.year, month.month);
    }

    @Get("ranking")
    @RequiredRole(AuthRoles.Member)
    @ApiOperation({ summary: "Get the total ranking of the current league season" })
    @ApiResponse({ status: 200, type: LeagueSeasonEvaluationDto, description: "Ranking stats for all members of a season" })
    async evaluateCurrentLeagueSeason(): Promise<LeagueSeasonEvaluationDto> {
        return this.service.evaluateCurrentLeagueSeason();
    }

    @Get(":year/:month/ranking")
    @RequiredRole(AuthRoles.Member)
    @ApiOperation({ summary: "Get the total ranking of the a league season" })
    @ApiResponse({ status: 200, type: LeagueSeasonEvaluationDto, description: "Ranking stats for all members of a season" })
    async evaluateLeagueSeason(@Param() year: SeasonYearParamDto, @Param() month: SeasonMonthParamDto): Promise<LeagueSeasonEvaluationDto> {
        return this.service.evaluateLeagueSeason(year.year, month.month);
    }
}
