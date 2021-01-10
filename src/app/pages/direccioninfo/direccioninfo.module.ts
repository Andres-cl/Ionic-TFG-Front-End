import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccioninfoPageRoutingModule } from './direccioninfo-routing.module';

import { DireccioninfoPage } from './direccioninfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccioninfoPageRoutingModule
  ],
  declarations: [DireccioninfoPage]
})
export class DireccioninfoPageModule {}
