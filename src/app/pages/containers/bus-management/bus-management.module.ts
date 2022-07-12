import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusManagementRoutingModule } from './bus-management-routing.module';
import { BusManagementComponent } from './bus-management.component';
import { StudentPaymentsInfoComponent } from './student-invoice/student-invoice.component';
import { ClassWiseFeesReportsComponent } from './class-fees-report/class-fees-report.component';
import { FeesReportTableComponent } from './student-fees-report/student-fees-report.component';
import { BusManagementDashboardComponent } from './bus-dashboard/bus-dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { InvoiceReviewComponent } from './invoice-review/invoice-review.component';
import { FeesHistoryComponent } from './fees-history/fees-history.component';
import { FeesStructureComponent } from './fees-structures/fees-structures.component';
import { DownloadFeesReportComponent } from './download-fees-report/download-fees-report.component';
import { BusAddFormComponent } from './bus-add-form/bus-add-form.component';
import { BusListComponent } from './bus-list/bus-list.component';
import { NewBusAddFormComponent } from './new-bus-add-form/new-bus-add-form.component';
import { RouteListComponent } from './routes-list/route-list.component';
import { NewRouteAddFormComponent } from './new-route-add-form/new-route-add-form.component';


@NgModule({
  declarations: [
    BusManagementComponent,
    BusManagementDashboardComponent,
    BusAddFormComponent,
    FeesReportTableComponent,
    ClassWiseFeesReportsComponent,
    StudentPaymentsInfoComponent,
    InvoiceReviewComponent,
    FeesHistoryComponent,
    FeesStructureComponent,
    DownloadFeesReportComponent,
    BusListComponent,
    NewBusAddFormComponent,
    RouteListComponent,
    NewRouteAddFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BusManagementRoutingModule,
  ]
})
export class BusManagementModule { }
