import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewRegistrationPageRoutingModule } from './new-registration-routing.module';

import { NewRegistrationPage } from './new-registration.page';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NewRegistrationPageRoutingModule,
    NgSelectModule
  ],
  declarations: [NewRegistrationPage]
})
export class NewRegistrationPageModule {}
