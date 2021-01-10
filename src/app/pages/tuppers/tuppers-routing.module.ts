import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TuppersPage } from './tuppers.page';

const routes: Routes = [
  {
    path: '',
    component: TuppersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TuppersPageRoutingModule {}
