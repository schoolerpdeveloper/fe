import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OneColumnLayoutComponent } from './components/one-column-layout/one-column-layout.component';
import { SharedModule } from '@shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { pageReducer } from './pages_store/reducers/index.reducer';
import { pagesFeatureKey } from './pages_store/reducers/app.state';

import { StudentEffects } from './pages_store/effects/students.effects';
import { StudentdetailsService } from '@shared/services/api/studentDetailsApi/studentdetails.service';
import { SibilingEffects } from './pages_store/effects/sibiling.effects';
import { ParentEffects } from './pages_store/effects/parents.effects';
import { TransportEffects } from './pages_store/effects/transport.effects';
import { AddressEffects } from './pages_store/effects/address.effects';
import { UtilEffects } from './pages_store/effects/util.effects';
import { FeesEffects } from './pages_store/effects/fees.effects';
import { FeesManagementDashboardComponent } from './containers/fees-management/fees-dashboard/fees-dashboard.component';
import { FeesReportTableComponent } from './containers/fees-management/student-fees-report/student-fees-report.component';
import { FeesReportsComponent } from './containers/fees-management/fees-reports/fees-reports.component';
import { ClassWiseFeesReportsComponent } from './containers/fees-management/class-fees-report/class-fees-report.component';
import { StudentPaymentsInfoComponent } from './containers/fees-management/student-invoice/student-invoice.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    OneColumnLayoutComponent,
    // FeesManagementDashboardComponent,
    // FeesReportTableComponent,
    // FeesReportsComponent,
    // ClassWiseFeesReportsComponent,
    // StudentPaymentsInfoComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    StoreModule.forFeature(pagesFeatureKey, pageReducer),
    EffectsModule.forFeature([
      StudentEffects,
      SibilingEffects,
      ParentEffects,
      TransportEffects,
      AddressEffects,
      UtilEffects,
      FeesEffects,
    ]),
  ],
  providers: [StudentdetailsService],
})
export class PagesModule {}
