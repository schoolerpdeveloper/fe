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
import { pageReducer, pagesFeatureKey } from './pages_store/reducers/pages.reducer';
import { PagesEffects } from './pages_store/effects/pages.effects';
import { StudentdetailsService } from '@shared/services/api/studentDetailsApi/studentdetails.service';


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
    EffectsModule.forFeature([PagesEffects])
  ],providers:[
    StudentdetailsService
  ]
})
export class PagesModule {
 
 }


