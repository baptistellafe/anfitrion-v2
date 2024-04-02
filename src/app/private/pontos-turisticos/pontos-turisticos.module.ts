import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PontosTuristicosPageRoutingModule } from './pontos-turisticos-routing.module';

import { PontosTuristicosPage } from './pontos-turisticos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PontosTuristicosPageRoutingModule
  ],
  declarations: [PontosTuristicosPage]
})
export class PontosTuristicosPageModule {}
