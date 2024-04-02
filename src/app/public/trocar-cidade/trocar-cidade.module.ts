import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrocarCidadePageRoutingModule } from './trocar-cidade-routing.module';

import { TrocarCidadePage } from './trocar-cidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrocarCidadePageRoutingModule
  ],
  declarations: [TrocarCidadePage]
})
export class TrocarCidadePageModule {}
