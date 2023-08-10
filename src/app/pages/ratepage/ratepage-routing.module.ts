import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatepagePage } from './ratepage.page';

const routes: Routes = [
  {
    path: '',
    component: RatepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatepagePageRoutingModule {}
