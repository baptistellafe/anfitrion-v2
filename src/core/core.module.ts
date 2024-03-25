import { NgModule } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    IonicModule.forRoot({
      swipeBackEnabled: false,
      mode: 'md',
      scrollAssist: false,
      scrollPadding: false
    }),
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  exports: [
    IonicModule,
    BrowserModule
  ]
})
export class CoreModule { }
