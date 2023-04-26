import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';
import { PublicRoutingModule } from './public/public-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  // Load the PublicRoutingModule for any path
  { path: '', loadChildren: () => PublicRoutingModule },

  // Load the AdminRoutingModule for any path containing "admin"
  { path: 'admin', loadChildren: () => AdminRoutingModule, canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  { path: 'admin/*', loadChildren: () => AdminRoutingModule, canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
