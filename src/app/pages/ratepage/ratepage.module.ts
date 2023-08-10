import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatepagePageRoutingModule } from './ratepage-routing.module';

import { RatepagePage } from './ratepage.page';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatepagePageRoutingModule,
    NgSelectModule
  ],
  declarations: [RatepagePage]
})
export class RatepagePageModule {}
