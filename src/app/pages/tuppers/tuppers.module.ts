import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TuppersPageRoutingModule } from './tuppers-routing.module';

import { TuppersPage } from './tuppers.page';
import {ComponentsModule} from "../../components/components.module";
import {AlimentosextraPageModule} from "../alimentosextra/alimentosextra.module";
import {AlimentosextraPage} from "../alimentosextra/alimentosextra.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TuppersPageRoutingModule,
        ComponentsModule,
        AlimentosextraPageModule
    ],
  declarations: [TuppersPage]
})
export class TuppersPageModule {}
