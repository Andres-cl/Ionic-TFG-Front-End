import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanseleccionaPage } from './planselecciona.page';

const routes: Routes = [
  {
    path: '',
    component: PlanseleccionaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanseleccionaPageRoutingModule {}
