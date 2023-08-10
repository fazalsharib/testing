import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OthersChangespagePage } from './others-changespage.page';

const routes: Routes = [
  {
    path: '',
    component: OthersChangespagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OthersChangespagePageRoutingModule {}
