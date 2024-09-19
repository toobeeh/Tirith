import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicRoutingModule } from './public/public-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { NavContentGuard } from './shared/guards/nav-content.guard';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { UserRoutingModule } from './user/user-routing.module';
import { RoleGuard } from './shared/guards/role.guard';

const routes: Routes = [

  // Load the PublicRoutingModule for any path
  {
    path: '',
    canActivate: [NavContentGuard],
    canActivateChild: [NavContentGuard],
    loadChildren: () => PublicRoutingModule,
    data: {
      navigation: [
        ["Get Typo", "https://tobeh.host/typo/", "external"],
        ["Infos & Help", "help", "route", true],
        ["Admin Panel", "admin", "route"],
        ["My Profile", "user", "route"],
        ["Tools", "tools", "route", true],
      ]
    }
  },

  // Load the AdminRoutingModule for any path containing "admin"
  {
    path: 'admin',
    loadChildren: () => AdminRoutingModule,
    canActivate: [RoleGuard, NavContentGuard],
    canActivateChild: [NavContentGuard],
    data: {
      requiredFlags: {
        moderator: true,
        contentModerator: true
      },
      navigation: [
        ["Home", "/", "route"],
        ["Admin Panel", "/admin", "route"],
        ["Lobbies", "/admin/lobbies", "route"],
        ["Members", "/admin/members", "route"],
        ["Emojis", "/admin/emojis", "route"]
      ]
    }
  },

  // Load the UserRoutingModule for any path containing "user"
  {
    path: 'user',
    loadChildren: () => UserRoutingModule,
    canActivate: [RoleGuard, NavContentGuard],
    canActivateChild: [NavContentGuard],
    data: {
      navigation: [
        /* ["Home", "/", "route"],
        ["My Profile", "/user", "route"], */
      ]
    }
  },

  // Load the AuthRoutingModule for any path containing "auth"
  {
    path: 'auth',
    canActivate: [NavContentGuard],
    canActivateChild: [NavContentGuard],
    data: {
      hideAll: true
    },
    loadChildren: () => AuthRoutingModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
