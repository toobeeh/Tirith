import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { SsrMetadataService } from './shared/services/ssr-metadata.service';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    SsrMetadataService
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
