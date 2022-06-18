import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StudentFormComponent } from './containers/student-form/student-form.component';
import { StudentManagementComponent } from './containers/student-management/student-management.component';
import { MainDashboardComponent } from './containers/main-dashboard/main-dashboard.component';
import { RouterEnum } from 'src/app/enums/router.enum';
import { SingleStudentManagementComponent } from './containers/single-student-management/single-student-management.component';
import { IsAuthenticatedGuard } from '@core/gaurds/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: RouterEnum.STUDENT_MANAGEMENT,
        component: StudentManagementComponent,
        data: {
          // animation: 'isRight'
        },
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: RouterEnum.DASHBOARD_MAIN,
        component: MainDashboardComponent,
        data: {
          // animation: 'isRight',
        },
      },
     
      {
        path: `${RouterEnum.STUDENT_MANAGEMENT}/:admissionNo`,
        component: SingleStudentManagementComponent,
        data: {
          //  animation: 'isRight'
        },
      },
      // { path: 'admission/:action', component: StudentFormComponent },
      {
        path: 'admission/new',
        component: StudentFormComponent,
        data: {
          // animation: 'isRight'
        },
      },
      { path: 'admission/edit/:id', component: StudentFormComponent },
      {
        path: '**',
        redirectTo: `/${RouterEnum.CONTAINER}/${RouterEnum.DASHBOARD}/${RouterEnum.STUDENT_MANAGEMENT}`,
        pathMatch: 'full',
      }, // fallback route - app -> pages-> dashboard -> main
    ],
  },
  // {
  //   path: '',
  //   redirectTo: `/${RouterEnum.CONTAINER}/${RouterEnum.DASHBOARD}`,
  //   pathMatch: 'full',
  // }, // fallback route - app->pages->dashboard
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
  constructor() {
    console.log(routes);
  }
}
