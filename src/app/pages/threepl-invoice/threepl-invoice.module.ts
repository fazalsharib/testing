import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThreeplInvoicePageRoutingModule } from './threepl-invoice-routing.module';

import { ThreeplInvoicePage } from './threepl-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThreeplInvoicePageRoutingModule
  ],
  declarations: [ThreeplInvoicePage]
})
export class ThreeplInvoicePageModule {}
