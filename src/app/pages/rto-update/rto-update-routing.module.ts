import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RtoUpdatePage } from './rto-update.page';

const routes: Routes = [
  {
    path: '',
    component: RtoUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RtoUpdatePageRoutingModule {}
