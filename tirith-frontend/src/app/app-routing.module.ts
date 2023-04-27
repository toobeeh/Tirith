import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';
import { PublicRoutingModule } from './public/public-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { NavContentGuard } from './shared/guards/nav-content.guard';

const routes: Routes = [
  // Load the PublicRoutingModule for any path
  {
    path: '',
    canActivate: [NavContentGuard],
    canActivateChild: [NavContentGuard],
    loadChildren: () => PublicRoutingModule,
    data: {
      navigation: [
        ["Admin Panel", "admin", "route"]
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
        ["Reports", "reports", "route"]
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
