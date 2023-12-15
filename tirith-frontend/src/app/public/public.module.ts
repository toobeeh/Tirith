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
import { ToolsComponent } from './pages/tools/tools.component';
import { RainbowPreviewComponent } from './pages/tools/rainbow-preview/rainbow-preview.component';
import { ScenesComponent } from './pages/tools/scenes/scenes.component';
import { SpritesComponent } from './pages/tools/sprites/sprites.component';


@NgModule({
  declarations: [
    LoginComponent,
    LandingComponent,
    FeaturesComponent,
    PrivacyComponent,
    DiscordComponent,
    PalantirComponent,
    HelpComponent,
    ToolsComponent,
    RainbowPreviewComponent,
    ScenesComponent,
    SpritesComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
