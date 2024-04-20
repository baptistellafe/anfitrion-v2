import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaPageRoutingModule } from './categoria-routing.module';

import { CategoriaPage } from './categoria.page';

@NgModule({
  imports: [
    SharedModule,
    CategoriaPageRoutingModule
  ],
  declarations: [CategoriaPage]
})
export class CategoriaPageModule {}
