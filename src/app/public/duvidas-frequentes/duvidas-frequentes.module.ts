import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';

import { DuvidasFrequentesPageRoutingModule } from './duvidas-frequentes-routing.module';

import { DuvidasFrequentesPage } from './duvidas-frequentes.page';

@NgModule({
  imports: [
    SharedModule,
    DuvidasFrequentesPageRoutingModule
  ],
  declarations: [DuvidasFrequentesPage]
})
export class DuvidasFrequentesPageModule {}
