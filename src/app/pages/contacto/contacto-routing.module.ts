import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactoPage } from './contacto.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/contacto/quienes_somos',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContactoPage,
    children: [
      {
        path:'formulario',
        loadChildren: () => import('../formulario/formulario.module').then( m => m.FormularioPageModule)
      },
      {
        path:'quienes_somos',
        loadChildren: () => import('../quienes-somos/quienes-somos.module').then( m => m.QuienesSomosPageModule)
      },
      {
        path:'faq',
        loadChildren: () => import('../faq/faq.module').then( m => m.FaqPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactoPageRoutingModule {}
