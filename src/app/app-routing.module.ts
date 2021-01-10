import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrer',
    loadChildren: () => import('./pages/registrer/registrer.module').then( m => m.RegistrerPageModule)
  },
  {
    path: 'platos',
    loadChildren: () => import('./pages/platos/platos.module').then( m => m.PlatosPageModule)
  },
  {
    path: 'infoplato/:plato',
    loadChildren: () => import('./pages/infoplato/infoplato.module').then( m => m.InfoplatoPageModule)
  },
  {
    path: 'tuppers',
    loadChildren: () => import('./pages/tuppers/tuppers.module').then( m => m.TuppersPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'direccioninfo',
    loadChildren: () => import('./pages/direccioninfo/direccioninfo.module').then( m => m.DireccioninfoPageModule)
  },
  {
    path: 'formulario',
    loadChildren: () => import('./pages/formulario/formulario.module').then( m => m.FormularioPageModule)
  },
  {
    path: 'quienes-somos',
    loadChildren: () => import('./pages/quienes-somos/quienes-somos.module').then( m => m.QuienesSomosPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'recupera-contrasenya',
    loadChildren: () => import('./pages/recupera-contrasenya/recupera-contrasenya.module').then( m => m.RecuperaContrasenyaPageModule)
  },
  {
    path: 'resumen-carrito',
    loadChildren: () => import('./pages/resumen-carrito/resumen-carrito.module').then( m => m.ResumenCarritoPageModule)
  },
  {
    path: 'pedido/:id',
    loadChildren: () => import('./pages/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'dieta-personal',
    loadChildren: () => import('./pages/dieta-personal/dieta-personal.module').then( m => m.DietaPersonalPageModule)
  },
  {
    path: 'dieta-personal-alimentos',
    loadChildren: () => import('./pages/dieta-personal-alimentos/dieta-personal-alimentos.module').then( m => m.DietaPersonalAlimentosPageModule)
  },
  {
    path: 'alimentosextra',
    loadChildren: () => import('./pages/alimentosextra/alimentosextra.module').then( m => m.AlimentosextraPageModule)
  },
  {
    path: 'plansemanal',
    loadChildren: () => import('./pages/plansemanal/plansemanal.module').then( m => m.PlansemanalPageModule)
  },
  {
    path: 'planselecciona',
    loadChildren: () => import('./pages/planselecciona/planselecciona.module').then( m => m.PlanseleccionaPageModule)
  },
  {
    path: 'tupper-plan',
    loadChildren: () => import('./pages/tupper-plan/tupper-plan.module').then( m => m.TupperPlanPageModule)
  },
  {
    path: 'revision-plan-semanal',
    loadChildren: () => import('./pages/revision-plan-semanal/revision-plan-semanal.module').then( m => m.RevisionPlanSemanalPageModule)
  },
  {
    path: 'revision-plato-plan',
    loadChildren: () => import('./pages/revision-plato-plan/revision-plato-plan.module').then( m => m.RevisionPlatoPlanPageModule)
  },
  {
    path: 'politica-privacidad',
    loadChildren: () => import('./pages/politica-privacidad/politica-privacidad.module').then( m => m.PoliticaPrivacidadPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
