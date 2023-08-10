import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'splash',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  // },
  {
    path: 'new-registration',
    loadChildren: () => import('./pages/new-registration/new-registration.module').then( m => m.NewRegistrationPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dasboard',
    loadChildren: () => import('./pages/dasboard/dasboard.module').then( m => m.DasboardPageModule)
  },
  {
    path: 'pick-up',
    loadChildren: () => import('./pages/pick-up/pick-up.module').then( m => m.PickUpPageModule)
  },
  {
    path: 'pickup-order',
    loadChildren: () => import('./pages/pickup-order/pickup-order.module').then( m => m.PickupOrderPageModule)
  },
  {
    path: 'pickup-done',
    loadChildren: () => import('./pages/pickup-done/pickup-done.module').then( m => m.PickupDonePageModule)
  },
  {
    path: 'pending-order',
    loadChildren: () => import('./pages/pending-order/pending-order.module').then( m => m.PendingOrderPageModule)
  },
  {
    path: 'generate-pickup',
    loadChildren: () => import('./pages/generate-pickup/generate-pickup.module').then( m => m.GeneratePickupPageModule)
  },
  {
    path: 'g-select-page',
    loadChildren: () => import('./pages/g-select-page/g-select-page.module').then( m => m.GSelectPagePageModule)
  },
  {
    path: 'pod-update',
    loadChildren: () => import('./pages/pod-update/pod-update.module').then( m => m.PodUpdatePageModule)
  },
  {
    path: 'rto-page',
    loadChildren: () => import('./pages/rto-page/rto-page.module').then( m => m.RtoPagePageModule)
  },
  {
    path: 'view',
    loadChildren: () => import('./pages/view/view.module').then( m => m.ViewPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./pages/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'delete',
    loadChildren: () => import('./pages/delete/delete.module').then( m => m.DeletePageModule)
  },
  {
    path: 'pod-inner',
    loadChildren: () => import('./pages/pod-inner/pod-inner.module').then( m => m.PodInnerPageModule)
  },
  {
    path: 'rto-update',
    loadChildren: () => import('./pages/rto-update/rto-update.module').then( m => m.RtoUpdatePageModule)
  },
  {
    path: 'edit-select',
    loadChildren: () => import('./pages/edit-select/edit-select.module').then( m => m.EditSelectPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'e-wallet',
    loadChildren: () => import('./pages/e-wallet/e-wallet.module').then( m => m.EWalletPageModule)
  },
  {
    path: 'ratepage',
    loadChildren: () => import('./pages/ratepage/ratepage.module').then( m => m.RatepagePageModule)
  },
  {
    path: 'others-changespage',
    loadChildren: () => import('./pages/others-changespage/others-changespage.module').then( m => m.OthersChangespagePageModule)
  },
  {
    path: 'about-page',
    loadChildren: () => import('./pages/about-page/about-page.module').then( m => m.AboutPagePageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'help-and-support',
    loadChildren: () => import('./pages/help-and-support/help-and-support.module').then( m => m.HelpAndSupportPageModule)
  },
  {
    path: 'print',
    loadChildren: () => import('./pages/print/print.module').then( m => m.PrintPageModule)
  },
  {
    path: 'invoice-print',
    loadChildren: () => import('./pages/invoice-print/invoice-print.module').then( m => m.InvoicePrintPageModule)
  },
  {
    path: 'threepl-invoice',
    loadChildren: () => import('./pages/threepl-invoice/threepl-invoice.module').then( m => m.ThreeplInvoicePageModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./pages/employee/employee.module').then( m => m.EmployeePageModule)
  },
  {
    path: 'add-employee',
    loadChildren: () => import('./pages/add-employee/add-employee.module').then( m => m.AddEmployeePageModule)
  },
  {
    path: 'edit-employee',
    loadChildren: () => import('./pages/edit-employee/edit-employee.module').then( m => m.EditEmployeePageModule)
  },
  {
    path: 'delete-employee',
    loadChildren: () => import('./pages/delete-employee/delete-employee.module').then( m => m.DeleteEmployeePageModule)
  },
  {
    path: 'tracking',
    loadChildren: () => import('./pages/tracking/tracking.module').then( m => m.TrackingPageModule)
  },
  // {
  //   path: 'splash',
  //   loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
