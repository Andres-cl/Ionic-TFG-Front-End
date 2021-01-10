import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosPageRoutingModule } from './datos-routing.module';

import { DatosPage } from './datos.page';
import {ComponentsModule} from "../../components/components.module";
import {DatosinfoPage} from "../datosinfo/datosinfo.page";
import {DatosinfoPageModule} from "../datosinfo/datosinfo.module";

@NgModule({
    entryComponents:[
       DatosinfoPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DatosPageRoutingModule,
        ComponentsModule,
        DatosinfoPageModule
    ],
  declarations: [DatosPage]
})
export class DatosPageModule {}
