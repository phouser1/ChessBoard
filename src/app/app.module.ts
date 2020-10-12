import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ 
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragDropModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [DragDropModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
