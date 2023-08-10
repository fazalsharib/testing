import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeletePageRoutingModule } from './delete-routing.module';

import { DeletePage } from './delete.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    NgMultiSelectDropDownModule.forRoot(),

    CommonModule,
    FormsModule,
    IonicModule,
    DeletePageRoutingModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    ReactiveFormsModule,
    IonicSelectableModule
  ],
  declarations: [DeletePage]
})
export class DeletePageModule {}
