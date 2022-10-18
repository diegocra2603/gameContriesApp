import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CamelCaseToTitleCasePipe } from './camel-case-to-title-case.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CamelCaseToTitleCasePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
