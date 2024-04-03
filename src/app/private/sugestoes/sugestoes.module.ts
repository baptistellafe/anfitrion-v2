import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugestoesPageRoutingModule } from './sugestoes-routing.module';

import { SugestoesPage } from './sugestoes.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SugestoesPageRoutingModule
  ],
  declarations: [SugestoesPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SugestoesPageModule {}
