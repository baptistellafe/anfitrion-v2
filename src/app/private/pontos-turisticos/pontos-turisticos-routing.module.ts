import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PontosTuristicosPage } from './pontos-turisticos.page';

const routes: Routes = [
  {
    path: '',
    component: PontosTuristicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PontosTuristicosPageRoutingModule {}
