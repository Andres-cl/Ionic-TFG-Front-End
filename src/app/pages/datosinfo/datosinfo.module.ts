import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosinfoPageRoutingModule } from './datosinfo-routing.module';

import { DatosinfoPage } from './datosinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosinfoPageRoutingModule
  ],
  declarations: [DatosinfoPage]
})
export class DatosinfoPageModule {}
