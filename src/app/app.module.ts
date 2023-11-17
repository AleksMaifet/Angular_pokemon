import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppComponent, InfiniteScrollModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
