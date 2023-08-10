import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneratePickupPage } from './generate-pickup.page';

const routes: Routes = [
  {
    path: '',
    component: GeneratePickupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratePickupPageRoutingModule {}
