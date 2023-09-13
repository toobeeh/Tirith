import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicRoutingModule } from './public/public-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { NavContentGuard } from './shared/guards/nav-content.guard';
import { AuthRoutingModule } from './auth/auth-routing.module';

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
      ]
    }
  },

  // Load the AdminRoutingModule for any path containing "admin"
  {
    path: 'admin',
    loadChildren: () => AdminRoutingModule,
    canActivate: [AuthGuard, NavContentGuard],
    canActivateChild: [AuthGuard, NavContentGuard],
    data: {
      navigation: [
        ["Home", "/", "route"],
        ["Admin Panel", "/admin", "route"],
        ["Lobbies", "/admin/lobbies", "route"]
      ]
    }
  },

  // Load the AuthRoutingModule for any path containing "auth"
  {
    path: 'auth',
    loadChildren: () => AuthRoutingModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
