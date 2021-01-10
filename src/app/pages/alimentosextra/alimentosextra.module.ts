import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlimentosextraPageRoutingModule } from './alimentosextra-routing.module';

import { AlimentosextraPage } from './alimentosextra.page';

@NgModule({
  entryComponents: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlimentosextraPageRoutingModule
  ],
  declarations: [AlimentosextraPage]
})
export class AlimentosextraPageModule {}
