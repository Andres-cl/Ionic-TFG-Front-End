import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietaPersonalAlimentosPageRoutingModule } from './dieta-personal-alimentos-routing.module';

import { DietaPersonalAlimentosPage } from './dieta-personal-alimentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DietaPersonalAlimentosPageRoutingModule
  ],
  declarations: [DietaPersonalAlimentosPage]
})
export class DietaPersonalAlimentosPageModule {}
