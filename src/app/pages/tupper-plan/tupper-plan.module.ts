import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TupperPlanPageRoutingModule } from './tupper-plan-routing.module';

import { TupperPlanPage } from './tupper-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TupperPlanPageRoutingModule
  ],
  declarations: [TupperPlanPage]
})
export class TupperPlanPageModule {}
