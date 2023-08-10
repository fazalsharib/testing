import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSelectPageRoutingModule } from './edit-select-routing.module';

import { EditSelectPage } from './edit-select.page';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSelectPageRoutingModule,
    NgSelectModule,
    Ng2SearchPipeModule,
  ],
  declarations: [EditSelectPage]
})
export class EditSelectPageModule {}
