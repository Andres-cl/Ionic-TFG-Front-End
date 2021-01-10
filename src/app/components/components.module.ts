import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {MenuComponent} from "./menu/menu.component";
import {IonicModule} from "@ionic/angular";
import {PopinfoComponent} from "./popinfo/popinfo.component";
import {FormsModule} from "@angular/forms";
import {RatingComponent} from "./rating/rating.component";
import {PlatosComponent} from "./platosComponent/platos.component";
import {InfoNutricionalComponent} from "./info-codigo/info-nutricional.component";
import {NutricionalesComponent} from "./nutricionales/nutricionales.component";
import {ResumenPlanSemanalComponent} from "./resumen-plan-semanal/resumen-plan-semanal.component";
import {RevisionPlatoPlanPageModule} from "../pages/revision-plato-plan/revision-plato-plan.module";
import {RouterModule} from "@angular/router";



@NgModule({
  entryComponents:[
      PopinfoComponent, InfoNutricionalComponent,ResumenPlanSemanalComponent,NutricionalesComponent
  ],
  declarations: [HeaderComponent, MenuComponent,PopinfoComponent,RatingComponent, PlatosComponent, InfoNutricionalComponent,NutricionalesComponent, ResumenPlanSemanalComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        RevisionPlatoPlanPageModule,
        RouterModule
    ],
  exports: [HeaderComponent, MenuComponent,PopinfoComponent,RatingComponent, PlatosComponent, InfoNutricionalComponent,NutricionalesComponent, ResumenPlanSemanalComponent]
})
export class ComponentsModule { }
