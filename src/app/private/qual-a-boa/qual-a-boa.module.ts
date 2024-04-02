import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QualABoaPageRoutingModule } from './qual-a-boa-routing.module';

import { QualABoaPage } from './qual-a-boa.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    QualABoaPageRoutingModule
  ],
  declarations: [QualABoaPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class QualABoaPageModule {}
