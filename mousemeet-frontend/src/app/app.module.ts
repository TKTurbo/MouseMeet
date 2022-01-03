import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {SocketService} from "./socket-service.service";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        FormsModule
    ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
