import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingOrderPageRoutingModule } from './pending-order-routing.module';

import { PendingOrderPage } from './pending-order.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingOrderPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [PendingOrderPage]
})
export class PendingOrderPageModule {}
