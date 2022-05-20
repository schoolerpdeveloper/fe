import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HotToastModule } from '@ngneat/hot-toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DebounceDirective } from './directives/debounce.directive';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import listPlugin from '@fullcalendar/list'; // a plugin!
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';

import { CdkTreeModule } from '@angular/cdk/tree';
import { StepperComponent } from './components/stepper/stepper.component';
import { ErpInputComponent } from './components/erp-input/erp-input.component';
import { ErpFieldErrorComponent } from './components/erp-field-error/erp-field-error.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { HttpClientModule } from '@angular/common/http';
import { StudentSearchComponent } from './components/student-search/student-search.component';
import { ListComponent } from './components/list/list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { ErpPaginatorComponent } from './components/erp-paginator/erp-paginator.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErpDropdownDirective } from './directives/erp-dropdown.directive';
import { ErpDropdownComponent } from './components/erp-dropdown/erp-dropdown.component';
import { SearchableStringFilterComponent } from './components/searchable-string-filter/searchable-string-filter.component';
import { AppLoadingDirective } from './directives/app-loading.directive';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { SkeletonLoaderDirective } from './directives/skeleton-loader.directive';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { SimpleAccordianComponent } from './components/simple-accordian/simple-accordian.component';
FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  listPlugin,
]);

const SHARED_MODS = [
  MatIconModule,
  MatIconModule,
  MatTooltipModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatMenuModule,
  MatStepperModule,
  FormsModule,
  HttpClientModule,
  CdkStepperModule,
  CdkAccordionModule,
  MatPaginatorModule,
  MatRippleModule,
  NgSelectModule,
  MatProgressSpinnerModule,
  NgOptionHighlightModule,
  NgxMaskModule.forRoot(),
  HotToastModule.forRoot(),
  ReactiveFormsModule,
  FullCalendarModule,
  CdkTreeModule,
  FlatpickrModule.forRoot(),
  MatDialogModule,
];

const SHARED_DECL = [
  DebounceDirective,
  StepperComponent,
  ErpInputComponent,
  ErpFieldErrorComponent,
  StudentSearchComponent,
  ListComponent,
  ErpPaginatorComponent,
  SearchableStringFilterComponent,
  AppLoadingDirective,
  LoaderComponent,
  SimpleAccordianComponent,
  SkeletonLoaderComponent, SkeletonLoaderDirective
];

@NgModule({
  declarations: [...SHARED_DECL, SimpleAccordianComponent],
  imports: [CommonModule, ...SHARED_MODS],
  exports: [SHARED_DECL, SHARED_MODS],
})
export class SharedModule {}
