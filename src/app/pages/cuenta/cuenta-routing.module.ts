import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaPage } from './cuenta.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/cuenta/datos',
    pathMatch: 'full'
  },
  {
    path: '',
    component: CuentaPage,
    children:[
      {
        path:'datos',
        loadChildren: () => import('../datos/datos.module').then( m => m.DatosPageModule)
      },
      {
       path:'direcciones',
        loadChildren: () => import('../direcciones/direcciones.module').then( m => m.DireccionesPageModule)
      },
      {
        path:'historialpedidos',
        loadChildren: () => import('../historialpedidos/pedidos.module').then( m => m.PedidosPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaPageRoutingModule {}
