import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietaPersonalAlimentosPage } from './dieta-personal-alimentos.page';

const routes: Routes = [
  {
    path: '',
    component: DietaPersonalAlimentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietaPersonalAlimentosPageRoutingModule {}
