import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrocarIdiomaPageRoutingModule } from './trocar-idioma-routing.module';

import { TrocarIdiomaPage } from './trocar-idioma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrocarIdiomaPageRoutingModule
  ],
  declarations: [TrocarIdiomaPage]
})
export class TrocarIdiomaPageModule {}
