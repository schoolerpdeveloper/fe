import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeesManagementRoutingModule } from './fees-management-routing.module';
import { FeesManagementComponent } from './fees-management.component';
import { StudentPaymentsInfoComponent } from './student-invoice/student-invoice.component';
import { ClassWiseFeesReportsComponent } from './class-fees-report/class-fees-report.component';
// import { FeesReportsComponent } from './fees-reports/fees-reports.component';
import { FeesReportTableComponent } from './student-fees-report/student-fees-report.component';
import { FeesManagementDashboardComponent } from './fees-dashboard/fees-dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { InvoiceReviewComponent } from './invoice-review/invoice-review.component';
import { FeesHistoryComponent } from './fees-history/fees-history.component';


@NgModule({
  declarations: [
    FeesManagementComponent,
    FeesManagementDashboardComponent,
    FeesReportTableComponent,
    // FeesReportsComponent,
    ClassWiseFeesReportsComponent,
    StudentPaymentsInfoComponent,
    InvoiceReviewComponent,
    FeesHistoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeesManagementRoutingModule,
  ]
})
export class FeesManagementModule { }
