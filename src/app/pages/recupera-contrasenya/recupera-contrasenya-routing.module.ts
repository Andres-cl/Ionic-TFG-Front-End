import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperaContrasenyaPage } from './recupera-contrasenya.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperaContrasenyaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperaContrasenyaPageRoutingModule {}
