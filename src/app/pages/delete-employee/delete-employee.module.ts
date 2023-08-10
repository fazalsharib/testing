import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteEmployeePageRoutingModule } from './delete-employee-routing.module';

import { DeleteEmployeePage } from './delete-employee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteEmployeePageRoutingModule
  ],
  declarations: [DeleteEmployeePage]
})
export class DeleteEmployeePageModule {}
