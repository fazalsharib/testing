import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PodInnerPage } from './pod-inner.page';

const routes: Routes = [
  {
    path: '',
    component: PodInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodInnerPageRoutingModule {}
