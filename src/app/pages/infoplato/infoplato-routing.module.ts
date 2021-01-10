import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoplatoPage } from './infoplato.page';

const routes: Routes = [
  {
    path: '',
    component: InfoplatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoplatoPageRoutingModule {}
