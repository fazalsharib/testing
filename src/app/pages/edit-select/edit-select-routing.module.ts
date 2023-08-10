import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSelectPage } from './edit-select.page';

const routes: Routes = [
  {
    path: '',
    component: EditSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSelectPageRoutingModule {}
