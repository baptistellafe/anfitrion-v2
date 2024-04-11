import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreferenciasPageRoutingModule } from './preferencias-routing.module';

import { PreferenciasPage } from './preferencias.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    PreferenciasPageRoutingModule
  ],
  declarations: [PreferenciasPage]
})
export class PreferenciasPageModule {}
