import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterEnum } from 'src/app/enums/router.enum';
import { ClassWiseFeesReportsComponent } from './class-fees-report/class-fees-report.component';
import { DownloadFeesReportComponent } from './download-fees-report/download-fees-report.component';
import { BusManagementDashboardComponent } from './bus-dashboard/bus-dashboard.component';
import { FeesHistoryComponent } from './fees-history/fees-history.component';
import { BusManagementComponent } from './bus-management.component';
import { FeesStructureComponent } from './fees-structures/fees-structures.component';
import { InvoiceReviewComponent } from './invoice-review/invoice-review.component';
import { FeesReportTableComponent } from './student-fees-report/student-fees-report.component';
// import { FeesReportsComponent } from './fees-reports/fees-reports.component';
import { StudentPaymentsInfoComponent } from './student-invoice/student-invoice.component';
import { BusAddFormComponent } from './bus-add-form/bus-add-form.component';
import { BusListComponent } from './bus-list/bus-list.component';

const routes: Routes = [
  {
    path: '',
    component: BusManagementComponent,
    children: [
      { path: '', component: BusManagementDashboardComponent },
      { path: 'dashboard', component: BusManagementDashboardComponent },
      { path: 'class-report', component: ClassWiseFeesReportsComponent },
      { path: 'student-report', component: FeesReportTableComponent },
      // { path: 'fees-report', component: StudentPaymentsInfoComponent },
      { path: 'fees-report/:id', component: StudentPaymentsInfoComponent },
      { path: 'fees-history/:id', component: FeesHistoryComponent },
      { path: 'fees-report/:id/review', component: InvoiceReviewComponent },
      { path: 'fees-structure', component: FeesStructureComponent },
      { path: 'download-report', component: DownloadFeesReportComponent },
      { path: 'add-bus', component: BusAddFormComponent },
      { path: 'list-bus', component: BusListComponent },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusManagementRoutingModule { }
