import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietaPersonalPage } from './dieta-personal.page';

const routes: Routes = [
  {
    path: '',
    component: DietaPersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietaPersonalPageRoutingModule {}
