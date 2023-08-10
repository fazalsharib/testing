import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RtoUpdatePageRoutingModule } from './rto-update-routing.module';

import { RtoUpdatePage } from './rto-update.page';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RtoUpdatePageRoutingModule,
    NgSelectModule
  ],
  declarations: [RtoUpdatePage]
})
export class RtoUpdatePageModule {}
