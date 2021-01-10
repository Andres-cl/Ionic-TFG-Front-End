import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoplatoPageRoutingModule } from './infoplato-routing.module';

import { InfoplatoPage } from './infoplato.page';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InfoplatoPageRoutingModule,
        ComponentsModule
    ],
  declarations: [InfoplatoPage]
})
export class InfoplatoPageModule {}
