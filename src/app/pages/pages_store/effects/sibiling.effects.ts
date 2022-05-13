import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { NotificationService } from '@shared/services/notification.service';
import { SibilingApiService } from '@shared/services/api/sibilingDetailsApi/sibiling-api.service';

@Injectable()
export class SibilingEffects {


  constructor(
    private actions$: Actions,
    private api: SibilingApiService,
    private notifier: NotificationService
  ) {}

  errorNotifier(error: any) {
    let { message } = error;
    this.notifier.errorNotification(message);
  }
}
