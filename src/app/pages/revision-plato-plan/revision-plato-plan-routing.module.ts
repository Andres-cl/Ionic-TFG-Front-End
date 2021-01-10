import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisionPlatoPlanPage } from './revision-plato-plan.page';

const routes: Routes = [
  {
    path: '',
    component: RevisionPlatoPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisionPlatoPlanPageRoutingModule {}
