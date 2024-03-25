import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NaoEncontramosPageRoutingModule } from './nao-encontramos-routing.module';

import { NaoEncontramosPage } from './nao-encontramos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NaoEncontramosPageRoutingModule
  ],
  declarations: [NaoEncontramosPage]
})
export class NaoEncontramosPageModule {}
