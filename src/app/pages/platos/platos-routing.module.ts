import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatosPage } from './platos.page';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/platos/comidas',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PlatosPage,
    children: [
      {
        path: 'desayunos',
        loadChildren: () => import('../desayunos/desayunos.module').then( m => m.DesayunosPageModule)
      },
      {
        path: 'comidas',
        loadChildren: () => import('../comidas/comidas.module').then( m => m.ComidasPageModule)
      },
      {
        path: 'cenas',
        loadChildren: () => import('../cenas/cenas.module').then( m => m.CenasPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatosPageRoutingModule {}
