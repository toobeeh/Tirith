import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AdminService } from './services/admin.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';


@NgModule({
  declarations: [
    LandingComponent,
    ReportsComponent
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
