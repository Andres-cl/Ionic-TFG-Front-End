import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TupperPlanPage } from './tupper-plan.page';

const routes: Routes = [
  {
    path: '',
    component: TupperPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TupperPlanPageRoutingModule {}
