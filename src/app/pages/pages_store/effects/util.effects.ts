import { Injectable } from '@angular/core';
import { Actions, ofType,createEffect } from '@ngrx/effects';
import { TransportApiService } from '@shared/services/api/transportDetailsApi/transport-api.service';
import { UtilApiService } from '@shared/services/api/utilApi/utilApi.service';
import { NotificationService } from '@shared/services/notification.service';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { TransportActions } from '../actions/transport.actions';
import { UtilityActions } from '../actions/util.actions';

@Injectable()
export class UtilEffects {

classConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UtilityActions.loadClassConfig),
      switchMap(() => {
        return this.api.getClassConfig().pipe(
          map((d) => {
            return UtilityActions.onClassConfigSuccess({ data: d });
          }),
          catchError((error) => {
            this.errorNotifier(error);
            return of(UtilityActions.onClassConfigFailure({err:error}));
          })
        );
      })
    );
  });
  constructor(
    private actions$: Actions,
    private api: UtilApiService,
    private notifier: NotificationService
  ) {}

  errorNotifier(error: any) {
    let { message } = error;
    this.notifier.errorNotification(message);
  }
}