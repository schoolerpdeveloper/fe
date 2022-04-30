import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { StudentManagementComponent } from './containers/student-management/student-management.component';
import { StudentFormComponent } from './containers/student-form/student-form.component';
import { MainDashboardComponent } from './containers/main-dashboard/main-dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { AdmissionFormComponent } from './components/admission-form/admission-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    StudentManagementComponent,
    StudentFormComponent,
    MainDashboardComponent,
    AdmissionFormComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule,ReactiveFormsModule],
})
export class DashboardModule {}
