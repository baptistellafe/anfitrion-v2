import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContatoPageRoutingModule } from './contato-routing.module';

import { ContatoPage } from './contato.page';
import "@lottiefiles/lottie-player";
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ContatoPageRoutingModule
  ],
  declarations: [ContatoPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ContatoPageModule {}
