import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccioninfoPage } from './direccioninfo.page';

const routes: Routes = [
  {
    path: '',
    component: DireccioninfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccioninfoPageRoutingModule {}
