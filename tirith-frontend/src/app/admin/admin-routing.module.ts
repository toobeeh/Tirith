import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { LobbiesComponent } from './pages/lobbies/lobbies.component';
import { MembersComponent } from './pages/members/members.component';
import { MemberComponent } from './pages/members/member/member.component';

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
    path: 'reports', component: ReportsComponent,
    pathMatch: "full",
  },
  {
    path: 'lobbies', component: LobbiesComponent,
    pathMatch: "full",
  },
  {
    path: 'members', component: MembersComponent,
    pathMatch: "full",
  },
  {
    path: 'members/:login', component: MemberComponent,
    pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
