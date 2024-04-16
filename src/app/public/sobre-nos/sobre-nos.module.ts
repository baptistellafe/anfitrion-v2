import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SobreNosPageRoutingModule } from './sobre-nos-routing.module';

import { SobreNosPage } from './sobre-nos.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SobreNosPageRoutingModule
  ],
  declarations: [SobreNosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SobreNosPageModule {}
