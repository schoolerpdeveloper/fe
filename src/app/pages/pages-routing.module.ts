import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterEnum } from '../enums/router.enum';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: RouterEnum.DASHBOARD,
        loadChildren: () =>
          import('./containers/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: RouterEnum.FEES_MANAGEMENT,
        loadChildren: () =>
          import('./containers/fees-management/fees-management.module').then(
            (m) => m.FeesManagementModule
          ),
      },
      // { path: '', redirectTo: `/${RouterEnum.CONTAINER}/${RouterEnum.DASHBOARD}`, pathMatch: 'full' }, // app -> pages -> dashboard
    ],
  },
  // { path: '', redirectTo: `/${RouterEnum.CONTAINER}`, pathMatch: 'full' }, // app -> pages

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
