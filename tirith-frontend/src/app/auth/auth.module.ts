import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AuthorizeComponent } from './pages/authorize/authorize.component';
import { SubmitComponent } from './pages/submit/submit.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    AuthorizeComponent,
    SubmitComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
