import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRegistrationPage } from './new-registration.page';

const routes: Routes = [
  {
    path: '',
    component: NewRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRegistrationPageRoutingModule {}
