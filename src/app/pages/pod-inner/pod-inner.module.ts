import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PodInnerPageRoutingModule } from './pod-inner-routing.module';

import { PodInnerPage } from './pod-inner.page';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PodInnerPageRoutingModule,
    NgSelectModule
  ],
  declarations: [PodInnerPage]
})
export class PodInnerPageModule {}
