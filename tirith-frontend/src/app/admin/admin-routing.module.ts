import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { LobbiesComponent } from './pages/lobbies/lobbies.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
