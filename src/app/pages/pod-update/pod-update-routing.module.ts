import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PodUpdatePage } from './pod-update.page';

const routes: Routes = [
  {
    path: '',
    component: PodUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodUpdatePageRoutingModule {}
