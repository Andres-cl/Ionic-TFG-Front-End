import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevisionPlatoPlanPageRoutingModule } from './revision-plato-plan-routing.module';

import { RevisionPlatoPlanPage } from './revision-plato-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisionPlatoPlanPageRoutingModule
  ],
  declarations: [RevisionPlatoPlanPage]
})
export class RevisionPlatoPlanPageModule {}
