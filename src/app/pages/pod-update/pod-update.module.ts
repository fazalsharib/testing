import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PodUpdatePageRoutingModule } from './pod-update-routing.module';

import { PodUpdatePage } from './pod-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PodUpdatePageRoutingModule
  ],
  declarations: [PodUpdatePage]
})
export class PodUpdatePageModule {}
