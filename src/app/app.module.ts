import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// MATERIAL UI
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // MATERIAL UI
    MatToolbarModule,
    MatSidenavModule,

    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
