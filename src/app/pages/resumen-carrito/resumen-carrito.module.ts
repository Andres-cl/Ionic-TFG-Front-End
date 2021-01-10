import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenCarritoPageRoutingModule } from './resumen-carrito-routing.module';

import { ResumenCarritoPage } from './resumen-carrito.page';
import {ComponentsModule} from "../../components/components.module";
import {DireccioninfoPage} from "../direccioninfo/direccioninfo.page";
import {DireccioninfoPageModule} from "../direccioninfo/direccioninfo.module";
import {PedidoPage} from "../pedido/pedido.page";
import {PedidosPageModule} from "../historialpedidos/pedidos.module";
import {RevisionPlanSemanalPage} from "../revision-plan-semanal/revision-plan-semanal.page";
import {RevisionPlanSemanalPageModule} from "../revision-plan-semanal/revision-plan-semanal.module";

@NgModule({
    entryComponents: [
        DireccioninfoPage,
        RevisionPlanSemanalPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ResumenCarritoPageRoutingModule,
        ComponentsModule,
        RevisionPlanSemanalPageModule,
        DireccioninfoPageModule,
    ],
  declarations: [ResumenCarritoPage]
})
export class ResumenCarritoPageModule {}
