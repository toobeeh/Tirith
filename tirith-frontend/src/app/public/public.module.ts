import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FeaturesComponent } from './pages/help/features/features.component';
import { PrivacyComponent } from './pages/help/privacy/privacy.component';
import { DiscordComponent } from './pages/help/discord/discord.component';
import { HelpComponent } from './pages/help/help.component';
import { ToolsComponent } from './pages/tools/tools.component';
import { RainbowPreviewComponent } from './pages/tools/rainbow-preview/rainbow-preview.component';
import { ScenesComponent } from './pages/tools/scenes/scenes.component';
import { SpritesComponent } from './pages/tools/sprites/sprites.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardBuilderComponent } from './pages/tools/card-builder/card-builder.component';
import { ColorAlphaModule } from 'ngx-color/alpha';
import { ColorHueModule } from 'ngx-color/hue';
import { ColorShadeModule } from 'ngx-color/shade';
import { ColorChromeModule } from 'ngx-color/chrome';
import { WorkshopComponent } from './pages/tools/workshop/workshop.component';
import { InviteComponent } from './pages/invite/invite.component';
import { SettingsComponent } from './pages/help/settings/settings.component';
import { BrowserModule } from '@angular/platform-browser';
import {NewPalantirComponent} from "./pages/help/new-palantir/new-palantir.component";
import {LobbyBotComponent} from "./pages/help/lobby-bot/lobby-bot.component";


@NgModule({
  declarations: [
    LoginComponent,
    LandingComponent,
    FeaturesComponent,
    PrivacyComponent,
    DiscordComponent,
    LobbyBotComponent,
    HelpComponent,
    ToolsComponent,
    RainbowPreviewComponent,
    CardBuilderComponent,
    ScenesComponent,
    SpritesComponent,
    WorkshopComponent,
    InviteComponent,
    SettingsComponent,
    NewPalantirComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ColorAlphaModule,
    ColorHueModule,
    ColorChromeModule,
    ColorShadeModule,
    ReactiveFormsModule,
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
