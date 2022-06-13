import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { NotificationService } from '@shared/services/notification.service';
import { SibilingApiService } from '@shared/services/api/sibilingDetailsApi/sibiling-api.service';

import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { SibilingActions } from '../actions/sibiling.actions';
import { of } from 'rxjs';
import { ISiblingDetails } from '@shared/models/siblingDeatils';
import { ParentActions } from '../actions/parent.actions';

@Injectable()
export class SibilingEffects {
  studentBasedSibilingDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SibilingActions.loadAdmissionBasedSibilings),
      concatMap(({ admissionNo }) => {
        return this.api.getStudentsiblingdetails(admissionNo).pipe(
          map((data: ISiblingDetails[]) =>
            SibilingActions.loadAdmissionBasedSibilingsSucess({ data })
          ),
          catchError((err: any) => {
            this.errorNotifier(err);
            return of(SibilingActions.loadAdmissionBasedSibilingsFailure(err));
          })
        );
      })
    );
  });

  updateSibilingDetails = createEffect(() => {
    return this.actions$.pipe(
      ofType(SibilingActions.updateSibiling),
      switchMap((action) =>
        this.api.updatesiblingdetails(action.data).pipe(
          map((d) => SibilingActions.updateSibiling(d)),
          catchError((err) => {
            this.errorNotifier(err);
            return of(SibilingActions.loadSibilingsIdFailure(err));
          })
        )
      )
    );
  });

  addParentDetails = createEffect(() => {
    return this.actions$.pipe(
      ofType(SibilingActions.addSibiling),
      switchMap((action) =>
        this.api.addsiblingdetails(action.data).pipe(
          tap((d) =>
            this.notifier.successNotification(
              'Added Sibiling Details Succesfully'
            )
          ),
          catchError((err) => {
            this.errorNotifier(err);
            return of(SibilingActions.loadSibilingsIdFailure(err));
          })
        )
      )
    );
  });

  deleteParentDetails = createEffect(() => {
    return this.actions$.pipe(
      ofType(SibilingActions.deleteSibiling),
      switchMap((action) =>
        this.api.deletesiblingdetails(action.data).pipe(
          tap((d) =>
            this.notifier.successNotification(
              'Deleted Sibiling Details Succesfully'
            )
          ),
          catchError((err) => {
            this.errorNotifier(err);
            return of(SibilingActions.loadSibilingsIdFailure(err));
          })
        )
      )
    );
  });

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
