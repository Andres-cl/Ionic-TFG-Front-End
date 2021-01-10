import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperaContrasenyaPageRoutingModule } from './recupera-contrasenya-routing.module';

import { RecuperaContrasenyaPage } from './recupera-contrasenya.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperaContrasenyaPageRoutingModule
  ],
  declarations: [RecuperaContrasenyaPage]
})
export class RecuperaContrasenyaPageModule {}
