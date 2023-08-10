import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RtoPagePageRoutingModule } from './rto-page-routing.module';

import { RtoPagePage } from './rto-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RtoPagePageRoutingModule
  ],
  declarations: [RtoPagePage]
})
export class RtoPagePageModule {}
