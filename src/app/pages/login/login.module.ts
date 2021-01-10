import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {ComponentsModule} from "../../components/components.module";
import {RecuperaContrasenyaPageModule} from "../recupera-contrasenya/recupera-contrasenya.module";
import {RecuperaContrasenyaPage} from "../recupera-contrasenya/recupera-contrasenya.page";

@NgModule({
    entryComponents:[
        RecuperaContrasenyaPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        ComponentsModule,
        RecuperaContrasenyaPageModule
    ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
