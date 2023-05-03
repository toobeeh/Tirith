import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FeaturesComponent } from './pages/help/features/features.component';
import { PrivacyComponent } from './pages/help/privacy/privacy.component';
import { DiscordComponent } from './pages/help/discord/discord.component';
import { PalantirComponent } from './pages/help/palantir/palantir.component';
import { HelpComponent } from './pages/help/help.component';


@NgModule({
  declarations: [
    LoginComponent,
    LandingComponent,
    FeaturesComponent,
    PrivacyComponent,
    DiscordComponent,
    PalantirComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
