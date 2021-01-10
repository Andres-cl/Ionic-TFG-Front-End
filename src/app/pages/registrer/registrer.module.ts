import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrerPageRoutingModule } from './registrer-routing.module';

import { RegistrerPage } from './registrer.page';
import {ComponentsModule} from "../../components/components.module";
import {RecaptchaModule} from "ng-recaptcha";
import {PoliticaPrivacidadPageModule} from "../politica-privacidad/politica-privacidad.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegistrerPageRoutingModule,
        ComponentsModule,
        RecaptchaModule,
        PoliticaPrivacidadPageModule
    ],
  declarations: [RegistrerPage]
})
export class RegistrerPageModule {}
