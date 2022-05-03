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
import { ParentFormComponent } from './components/parent-form/parent-form.component';
import { SibilingFormComponent} from './components/sibiling-form/sibiling-form.component';
import { TransportFormComponent } from './components/transport-form/transport-form.component';
import { FeesFormComponent } from './components/fees-form/fees-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StudentManagementComponent,
    StudentFormComponent,
    MainDashboardComponent,
    AdmissionFormComponent,
    ParentFormComponent,
    SibilingFormComponent,
    TransportFormComponent,
    FeesFormComponent,
    
    
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule,ReactiveFormsModule],
})
export class DashboardModule {}
