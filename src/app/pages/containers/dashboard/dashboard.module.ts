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
import { StudentListCardComponent } from './components/student-list-card/student-list-card.component';
import { ConfiguredModalComponent } from './components/configured-modal/configured-modal.component';
import { FilterByClassAndFeesPipe } from './pipes/filter-by-class-and-fees.pipe';
import { SingleStudentManagementComponent } from './containers/single-student-management/single-student-management.component';
import { StudentDetailCardComponent } from './components/student-detail-card/student-detail-card.component';
import { StudentBasedParentCardComponent } from './components/student-based-parent-card/student-based-parent-card.component';
import { StudentBasedSibilingCardComponent } from './components/student-based-sibiling-card/student-based-sibiling-card.component';
import { StudentBasedTransportCardComponent } from './components/student-based-transport-card/student-based-transport-card.component';
import { StudentBasedFeesCardComponent } from './components/student-based-fees-card/student-based-fees-card.component';
import { AddressFormComponent } from './components/address-form/address-form.component';

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
    StudentListCardComponent,
    ConfiguredModalComponent,
    FilterByClassAndFeesPipe,
    SingleStudentManagementComponent,
    StudentDetailCardComponent,
    StudentBasedParentCardComponent,
    StudentBasedSibilingCardComponent,
    StudentBasedTransportCardComponent,
    StudentBasedFeesCardComponent,
    AddressFormComponent,
    
    
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule,ReactiveFormsModule],
})
export class DashboardModule {}
