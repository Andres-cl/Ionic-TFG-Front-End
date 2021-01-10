import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlimentosextraPage } from './alimentosextra.page';

const routes: Routes = [
  {
    path: '',
    component: AlimentosextraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlimentosextraPageRoutingModule {}
