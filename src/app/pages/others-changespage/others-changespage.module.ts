import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OthersChangespagePageRoutingModule } from './others-changespage-routing.module';

import { OthersChangespagePage } from './others-changespage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OthersChangespagePageRoutingModule
  ],
  declarations: [OthersChangespagePage]
})
export class OthersChangespagePageModule {}
