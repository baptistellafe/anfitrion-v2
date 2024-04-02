import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrocarCidadePage } from './trocar-cidade.page';

const routes: Routes = [
  {
    path: '',
    component: TrocarCidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrocarCidadePageRoutingModule {}
