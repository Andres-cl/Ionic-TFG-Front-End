import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenCarritoPage } from './resumen-carrito.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenCarritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenCarritoPageRoutingModule {}
