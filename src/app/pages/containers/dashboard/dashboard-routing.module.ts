import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StudentFormComponent } from './containers/student-form/student-form.component';
import { StudentManagementComponent } from './containers/student-management/student-management.component';
import { MainDashboardComponent } from './containers/main-dashboard/main-dashboard.component';
import { RouterEnum } from 'src/app/enums/router.enum';
import { SingleStudentManagementComponent } from './containers/single-student-management/single-student-management.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: RouterEnum.DASHBOARD_MAIN, component: MainDashboardComponent },
      { path: 'student-management', component: StudentManagementComponent },
      {
        path: 'student-management/:admissionNo',
        component: SingleStudentManagementComponent,
      },
      // { path: 'admission/:action', component: StudentFormComponent },
      { path: 'admission/new', component: StudentFormComponent },
      { path: 'admission/edit/:id', component: StudentFormComponent },
      {
        path: '**',
        redirectTo: `/${RouterEnum.CONTAINER}/${RouterEnum.DASHBOARD}/${RouterEnum.DASHBOARD_MAIN}`,
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
