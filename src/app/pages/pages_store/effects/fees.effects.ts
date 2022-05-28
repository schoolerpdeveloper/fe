import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { IFeesDeatils } from '@shared/models/feesDetails';
import { IParentDetails } from '@shared/models/parentDetails';
import { FeesApiService } from '@shared/services/api/feesDetailsApi/fees-api.service';
import { NotificationService } from '@shared/services/notification.service';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { FeesAction } from '../actions/fees.actions';

@Injectable()
export class FeesEffects {
  studentBasedFeesDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeesAction.loadStudentBasedFees),
      tap(console.log),
      switchMap(({ admissionNo }) =>
        this.api.getStudentFeesDetails(admissionNo).pipe(
          map((d: IFeesDeatils[]) =>
            FeesAction.loadStudentBasedFeesSuccess({ data: d })
          ),
          catchError((err) => {
            this.errorNotifier(err);
            return of(FeesAction.loadStudentBasedFeesFailure(err));
          })
        )
      )
    );
  });
  constructor(
    private actions$: Actions,
    private api: FeesApiService,
    private notifier: NotificationService
  ) {}

  errorNotifier(error: any) {
    let { message } = error;
    this.notifier.errorNotification(message);
  }
}
