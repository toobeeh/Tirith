import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { environment } from 'src/environments/environment';
import { ApiModule, Configuration, ConfigurationParameters } from 'src/api';
import { UserModule } from './user/user.module';
import { UserService } from './shared/services/user-session.service';


export const apiConfigFactory = () => {
  const params: ConfigurationParameters = {
    basePath: environment.apiUrl,
    credentials: {
      "bearer": () => UserService.getToken() ?? undefined
    }
  };
  return new Configuration(params);
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ApiModule.forRoot(apiConfigFactory),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    AdminModule,
    PublicModule,
    SharedModule,
    AuthModule,
    UserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
