import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PrimeiroAcessoPageRoutingModule } from './primeiro-acesso-routing.module';

import { PrimeiroAcessoPage } from './primeiro-acesso.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    PrimeiroAcessoPageRoutingModule
  ],
  declarations: [PrimeiroAcessoPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PrimeiroAcessoPageModule {}
