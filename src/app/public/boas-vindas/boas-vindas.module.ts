import { NgModule } from '@angular/core';
import { BoasVindasPageRoutingModule } from './boas-vindas-routing.module';

import { BoasVindasPage } from './boas-vindas.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    BoasVindasPageRoutingModule
  ],
  declarations: [BoasVindasPage]
})
export class BoasVindasPageModule {}
