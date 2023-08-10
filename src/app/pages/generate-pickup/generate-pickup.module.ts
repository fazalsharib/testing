import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratePickupPageRoutingModule } from './generate-pickup-routing.module';

import { GeneratePickupPage } from './generate-pickup.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneratePickupPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [GeneratePickupPage]
})
export class GeneratePickupPageModule {}
