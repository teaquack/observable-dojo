import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DojoComponent } from './dojo/dojo.component';
import { HttpClientModule } from '@angular/common/http';
import { HandlersComponent } from './handlers/handlers.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DojoComponent,
    HandlersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
