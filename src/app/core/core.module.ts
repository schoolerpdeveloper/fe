import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from './services/storage/storage.service';
import { AutoUnSubscribeService } from './services/auto-unsubscribe/auto-un-subscribe.service';
import { HttpClientModule } from '@angular/common/http';

const providers = [
  { provide: 'Window', useValue: window },
  StorageService,
  AutoUnSubscribeService,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule,HttpClientModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Imported it in the AppModule only'
      );
    }
  }
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [...providers],
    };
  }
}
