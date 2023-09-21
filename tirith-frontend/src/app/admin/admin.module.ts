import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AdminService } from './services/lobbies.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { LobbiesComponent } from './pages/lobbies/lobbies.component';
import { MembersComponent } from './pages/members/members.component';
import { MemberComponent } from './pages/members/member/member.component';


@NgModule({
  declarations: [
    LandingComponent,
    ReportsComponent,
    LobbiesComponent,
    MembersComponent,
    MemberComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxJsonViewerModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
