import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GSelectPagePage } from './g-select-page.page';

const routes: Routes = [
  {
    path: '',
    component: GSelectPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GSelectPagePageRoutingModule {}
