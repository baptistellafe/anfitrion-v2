import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarDadosPageRoutingModule } from './editar-dados-routing.module';

import { EditarDadosPage } from './editar-dados.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    EditarDadosPageRoutingModule
  ],
  declarations: [EditarDadosPage]
})
export class EditarDadosPageModule {}
