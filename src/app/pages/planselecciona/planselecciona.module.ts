import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanseleccionaPageRoutingModule } from './planselecciona-routing.module';

import { PlanseleccionaPage } from './planselecciona.page';
import {TupperPlanPageModule} from "../tupper-plan/tupper-plan.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanseleccionaPageRoutingModule,
      TupperPlanPageModule
  ],
  declarations: [PlanseleccionaPage]
})
export class PlanseleccionaPageModule {}
