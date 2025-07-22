import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import {AuthorizeComponent} from "./pages/authorize/authorize.component";
import {SubmitComponent} from "./pages/submit/submit.component";

const routes: Routes = [
  {
    path: '', component: AuthenticationComponent,
    pathMatch: "full",
  },
  {
    path: 'authorize', component: AuthorizeComponent,
    pathMatch: "full",
  },
  {
    path: 'submit', component: SubmitComponent,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
