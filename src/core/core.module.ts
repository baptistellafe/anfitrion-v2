import { appReducer } from './../app/store/app/app.state';
import { NgModule } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    IonicModule.forRoot({
      swipeBackEnabled: false,
      mode: 'md',
      scrollAssist: false,
      scrollPadding: false
    }),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: 'anfitrion-storage',
      storeName: 'anfitrion-store',
      dbKey: 'anfitrion-key'
    }),
    StoreModule.forRoot({ app: appReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  exports: [
    IonicModule,
    BrowserModule
  ]
})
export class CoreModule { }
