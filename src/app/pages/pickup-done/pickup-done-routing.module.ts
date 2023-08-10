import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickupDonePage } from './pickup-done.page';

const routes: Routes = [
  {
    path: '',
    component: PickupDonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickupDonePageRoutingModule {}
