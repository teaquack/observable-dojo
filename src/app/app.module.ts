import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DojoComponent } from './dojo/dojo.component';
import { HandlersComponent } from './handlers/handlers.component';
import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconService } from './shared/icon.service';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DojoComponent,
        HandlersComponent
    ],
    imports: [
        // BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(private iconService: IconService) {
        console.log('AppModule loaded');
        this.iconService.registerIcons([
            { name: 'lock', path: '../assets/icons/lock.svg' }
        ]);
    }
}
