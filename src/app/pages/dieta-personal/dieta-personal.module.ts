import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietaPersonalPageRoutingModule } from './dieta-personal-routing.module';

import { DietaPersonalPage } from './dieta-personal.page';
import {ComponentsModule} from "../../components/components.module";
import {DietaPersonalAlimentosPageModule} from "../dieta-personal-alimentos/dieta-personal-alimentos.module";
import {DietaPersonalAlimentosPage} from "../dieta-personal-alimentos/dieta-personal-alimentos.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DietaPersonalPageRoutingModule,
        ComponentsModule,
        DietaPersonalAlimentosPageModule
    ],
  declarations: [DietaPersonalPage]
})
export class DietaPersonalPageModule {}
