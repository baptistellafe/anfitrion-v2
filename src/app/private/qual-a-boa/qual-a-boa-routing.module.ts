import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QualABoaPage } from './qual-a-boa.page';

const routes: Routes = [
  {
    path: '',
    component: QualABoaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QualABoaPageRoutingModule {}
