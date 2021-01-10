import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlansemanalPageRoutingModule } from './plansemanal-routing.module';

import { PlansemanalPage } from './plansemanal.page';
import {ComponentsModule} from "../../components/components.module";
import {PlanseleccionaPageModule} from "../planselecciona/planselecciona.module";
import {TupperPlanPageModule} from "../tupper-plan/tupper-plan.module";
import {PlanseleccionaPage} from "../planselecciona/planselecciona.page";
import {TupperPlanPage} from "../tupper-plan/tupper-plan.page";
import {NutricionalesComponent} from "../../components/nutricionales/nutricionales.component";

@NgModule({
    entryComponents : [
        NutricionalesComponent
    ],

    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PlansemanalPageRoutingModule,
        ComponentsModule,
        PlanseleccionaPageModule,
        TupperPlanPageModule
    ],
  declarations: [PlansemanalPage]
})
export class PlansemanalPageModule {}
