import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { NotificationService } from '@shared/services/notification.service';
import { TransportActions } from '../actions/transport.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { TransportSelector } from '../selectors/transport.selector';
import { TransportApiService } from '@shared/services/api/transportDetailsApi/transport-api.service';

@Injectable()
export class TransportEffects {
  loadBusRouteCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransportActions.loadBusRouteId),
      withLatestFrom(this.store.select(TransportSelector.selectBusRouteCode)),
      switchMap((data) => {
        return this.api.getBusRouteDetails(data[1]).pipe(
          map((d) => {
            return TransportActions.loadBusRouteIdSuccess({ data: d });
          }),
          catchError((error) => {
            this.errorNotifier(error);
            return of(TransportActions.loadBusRouteIdFailure({ error }));
          })
        );
      })
    );
  });
  loadAllBusRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransportActions.loadAllBusRoute),
      
      switchMap((data) => {
        return this.api.allBusRouteDetails().pipe(
          map((d) => {
            return TransportActions.loadAllBusRouteSuccess({ data: d });
          }),
          catchError((error) => {
            this.errorNotifier(error);
            return of(TransportActions.loadAllBusRouteFailure({ error }));
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private api: TransportApiService,
    private store: Store,
    private notifier: NotificationService
  ) {}

  errorNotifier(error: any) {
    let { message } = error;
    this.notifier.errorNotification(message);
  }
}
