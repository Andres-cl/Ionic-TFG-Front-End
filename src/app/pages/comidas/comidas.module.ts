import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComidasPageRoutingModule } from './comidas-routing.module';

import { ComidasPage } from './comidas.page';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComidasPageRoutingModule,
        ComponentsModule,
    ],
  declarations: [ComidasPage]
})
export class ComidasPageModule {}
