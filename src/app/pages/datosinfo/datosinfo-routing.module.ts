import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosinfoPage } from './datosinfo.page';

const routes: Routes = [
  {
    path: '',
    component: DatosinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosinfoPageRoutingModule {}
