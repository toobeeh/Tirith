import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { LobbiesComponent } from './pages/lobbies/lobbies.component';
import { MembersComponent } from './pages/members/members.component';
import { MemberComponent } from './pages/members/member/member.component';
import {EmojisComponent} from "./pages/emojis/emojis.component";
import {AddEmojisComponent} from "./pages/emojis/add-emojis/add-emojis.component";
import {RoleGuard} from "../shared/guards/role.guard";
import {MemberDto} from "../../api";
import MemberFlagsEnum = MemberDto.MemberFlagsEnum;

const routes: Routes = [
  {
    path: '', component: LandingComponent,
    pathMatch: "full",
  },
  {
    path: 'landing', component: LandingComponent,
    pathMatch: "full",
  },
  {
    canActivate: [RoleGuard],
    data: { requiredFlags: [MemberFlagsEnum.Moderator] },
    path: 'reports', component: ReportsComponent,
    pathMatch: "full",
  },
  {
    canActivate: [RoleGuard],
    data: { requiredFlags: [MemberFlagsEnum.Moderator] },
    path: 'lobbies', component: LobbiesComponent,
    pathMatch: "full",
  },
  {
    canActivate: [RoleGuard],
    data: { requiredFlags: [MemberFlagsEnum.Moderator] },
    path: 'members', component: MembersComponent,
    pathMatch: "full",
  },
  {
    canActivate: [RoleGuard],
    data: { requiredFlags: [MemberFlagsEnum.Moderator] },
    path: 'members/:login', component: MemberComponent,
    pathMatch: "full",
  },
  {
    canActivate: [RoleGuard],
    data: { requiredFlags: [MemberFlagsEnum.Moderator, MemberFlagsEnum.ContentModerator, MemberFlagsEnum.EmojiManagement] },
    path: 'emojis', component: EmojisComponent,
    pathMatch: "full",
  },
  {
    canActivate: [RoleGuard],
    data: { requiredFlags: [MemberFlagsEnum.Moderator, MemberFlagsEnum.ContentModerator, MemberFlagsEnum.EmojiManagement] },
    path: 'emojis/add', component: AddEmojisComponent,
    pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
