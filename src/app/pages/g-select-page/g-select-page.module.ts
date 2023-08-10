import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GSelectPagePageRoutingModule } from './g-select-page-routing.module';

import { GSelectPagePage } from './g-select-page.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GSelectPagePageRoutingModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    ReactiveFormsModule,

  ],
  declarations: [GSelectPagePage]
})
export class GSelectPagePageModule {}
