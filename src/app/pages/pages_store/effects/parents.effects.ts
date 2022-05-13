import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { NotificationService } from '@shared/services/notification.service';
import { ParentApiService } from '@shared/services/api/parentDetailsApi/parent-api.service';

@Injectable()
export class ParentEffects {


  constructor(
    private actions$: Actions,
    private api: ParentApiService,
    private notifier: NotificationService
  ) {}

  errorNotifier(error: any) {
    let { message } = error;
    this.notifier.errorNotification(message);
  }
}
