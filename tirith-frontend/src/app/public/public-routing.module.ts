import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FeaturesComponent } from './pages/help/features/features.component';
import { PrivacyComponent } from './pages/help/privacy/privacy.component';
import { DiscordComponent } from './pages/help/discord/discord.component';
import { HelpComponent } from './pages/help/help.component';
import { NavContentGuard } from '../shared/guards/nav-content.guard';
import { ToolsComponent } from './pages/tools/tools.component';
import { SpritesComponent } from './pages/tools/sprites/sprites.component';
import { ScenesComponent } from './pages/tools/scenes/scenes.component';
import { RainbowPreviewComponent } from './pages/tools/rainbow-preview/rainbow-preview.component';
import { CardBuilderComponent } from './pages/tools/card-builder/card-builder.component';
import { WorkshopComponent } from './pages/tools/workshop/workshop.component';
import { InviteComponent } from './pages/invite/invite.component';
import { SettingsComponent } from './pages/help/settings/settings.component';
import {NewPalantirComponent} from "./pages/help/new-palantir/new-palantir.component";
import {LobbyBotComponent} from "./pages/help/lobby-bot/lobby-bot.component";
import {PalantirTosComponent} from "./pages/help/palantir-tos/palantir-tos.component";
import {RulesComponent} from "./pages/help/rules/rules.component";
import {DiscordRolesComponent} from "./pages/help/discord-roles/discord-roles.component";

const helpNavigationData = {
  navigation: [
    ["Help", "help", "route"],
    ["Discord Features", "help/discord", "route"],
    ["Command Help", "help/new-palantir", "route"],
    ["Features", "help/features", "route"],
    ["Settings", "help/settings", "route"],
  ]
};

const toolsNavigationData = {
  navigation: [
    ["Tools", "tools", "route"],
    ["Card Builder", "tools/card-builder", "route"],
    ["Rainbow Preview", "tools/rainbow-preview", "route"],
    ["Sprites", "tools/sprites", "route"],
    ["Scenes", "tools/scenes", "route"],
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
    data: helpNavigationData
  },
  {
    path: 'help/features',
    component: FeaturesComponent,
    pathMatch: "full",
    data: helpNavigationData
  },
  {
    path: 'help/discord',
    component: DiscordComponent,
    pathMatch: "full",
    data: helpNavigationData
  },
  {
    path: 'help/discord-roles',
    component: DiscordRolesComponent,
    pathMatch: "full",
    data: helpNavigationData
  },
  {
    path: 'help/new-palantir',
    component: NewPalantirComponent,
    pathMatch: "full",
    data: helpNavigationData
  },
  {
    path: 'help/lobby-bot',
    component: LobbyBotComponent,
    pathMatch: "full",
    data: helpNavigationData
  },
  {
    path: 'help/settings',
    component: SettingsComponent,
    pathMatch: "full",
    data: helpNavigationData
  },
  {
    path: 'tools',
    component: ToolsComponent,
    pathMatch: "full",
    data: toolsNavigationData
  },
  {
    path: 'tools/sprites',
    component: SpritesComponent,
    pathMatch: "full",
    data: toolsNavigationData
  },
  {
    path: 'tools/scenes',
    component: ScenesComponent,
    pathMatch: "full",
    data: toolsNavigationData
  },
  {
    path: 'tools/rainbow-preview',
    component: RainbowPreviewComponent,
    pathMatch: "full",
    data: toolsNavigationData
  },
  {
    path: 'tools/card-builder',
    component: CardBuilderComponent,
    pathMatch: "full",
    data: toolsNavigationData
  },
  {
    path: 'tools/workshop',
    component: WorkshopComponent,
    pathMatch: "full",
    data: toolsNavigationData
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'help/rules',
    component: RulesComponent
  },
  {
    path: 'palantir-tos',
    component: PalantirTosComponent
  },
  {
    path: 'invite/:token',
    component: InviteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
