import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaoEncontramosPage } from './nao-encontramos.page';

const routes: Routes = [
  {
    path: '',
    component: NaoEncontramosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NaoEncontramosPageRoutingModule {}
