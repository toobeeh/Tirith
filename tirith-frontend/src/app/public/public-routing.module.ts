import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FeaturesComponent } from './pages/help/features/features.component';
import { PrivacyComponent } from './pages/help/privacy/privacy.component';
import { DiscordComponent } from './pages/help/discord/discord.component';
import { PalantirComponent } from './pages/help/palantir/palantir.component';
import { HelpComponent } from './pages/help/help.component';
import { NavContentGuard } from '../shared/guards/nav-content.guard';

const navigationData = {
  navigation: [
    ["Get Typo", "https://tobeh.host/typo/", "external"],
    ["Help", "help", "route"],
    ["Features", "help/features", "route"],
    ["Discord & Palantir", "help/discord", "route"],
    ["Palantir Setup", "help/palantir", "route"]
  ]
};

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    component: LandingComponent
  },
  {
    path: 'login',
    pathMatch: "full",
    component: LoginComponent
  },
  {
    path: 'help',
    component: HelpComponent,
    pathMatch: "full",
    canActivate: [NavContentGuard],
    data: navigationData
  },
  {
    path: 'help/features',
    component: FeaturesComponent,
    pathMatch: "full",
    canActivate: [NavContentGuard],
    data: navigationData
  },
  {
    path: 'help/discord',
    component: DiscordComponent,
    pathMatch: "full",
    canActivate: [NavContentGuard],
    data: navigationData
  },
  {
    path: 'help/palantir',
    component: PalantirComponent,
    pathMatch: "full",
    canActivate: [NavContentGuard],
    data: navigationData
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
