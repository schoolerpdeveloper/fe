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


@NgModule({
  declarations: [
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    OneColumnLayoutComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    StoreModule.forFeature(pagesFeatureKey, pageReducer),
    EffectsModule.forFeature([StudentEffects,SibilingEffects,ParentEffects,TransportEffects])
  ],providers:[
    StudentdetailsService
  ]
})
export class PagesModule {
 
 }


