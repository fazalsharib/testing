import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickupDonePageRoutingModule } from './pickup-done-routing.module';

import { PickupDonePage } from './pickup-done.page';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickupDonePageRoutingModule,
    NgSelectModule
  ],
  declarations: [PickupDonePage]
})
export class PickupDonePageModule {}
