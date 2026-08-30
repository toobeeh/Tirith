import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { LobbiesComponent } from './pages/lobbies/lobbies.component';
import { MembersComponent } from './pages/members/members.component';
import { MemberComponent } from './pages/members/member/member.component';
import { EmojisComponent } from './pages/emojis/emojis.component';
import { AddEmojisComponent } from './pages/emojis/add-emojis/add-emojis.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DropHistoryComponent} from "./pages/drop-history/drop-history.component";
import {NgChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    LandingComponent,
    LobbiesComponent,
    MembersComponent,
    MemberComponent,
    EmojisComponent,
    AddEmojisComponent,
    DropHistoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxJsonViewerModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: []
})
export class AdminModule { }
