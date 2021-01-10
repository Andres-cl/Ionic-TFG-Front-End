import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisionPlanSemanalPage } from './revision-plan-semanal.page';

const routes: Routes = [
  {
    path: '',
    component: RevisionPlanSemanalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisionPlanSemanalPageRoutingModule {}
