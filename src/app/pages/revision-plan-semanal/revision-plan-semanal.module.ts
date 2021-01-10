import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevisionPlanSemanalPageRoutingModule } from './revision-plan-semanal-routing.module';

import { RevisionPlanSemanalPage } from './revision-plan-semanal.page';
import {ResumenPlanSemanalComponent} from "../../components/resumen-plan-semanal/resumen-plan-semanal.component";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  entryComponents:[ResumenPlanSemanalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisionPlanSemanalPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [RevisionPlanSemanalPage]
})
export class RevisionPlanSemanalPageModule {}
