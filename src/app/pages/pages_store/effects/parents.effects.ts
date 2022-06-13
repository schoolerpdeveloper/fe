import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { NotificationService } from '@shared/services/notification.service';
import { ParentApiService } from '@shared/services/api/parentDetailsApi/parent-api.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ParentActions } from '../actions/parent.actions';
import { of } from 'rxjs';
import { IParentDetails } from '@shared/models/parentDetails';
import { IParentDetailsAddress } from '@shared/models/parentDetailsAdress';

@Injectable()
export class ParentEffects {
  studentBasedParentDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ParentActions.loadAdmissionBasedParents),
      switchMap(({ admissionNo }) =>
        this.api.getStudentParentDetails(admissionNo).pipe(
          map((d: IParentDetails[]) =>
            ParentActions.loadAdmissionBasedParentsSucess({ data: d })
          ),
          catchError((err) => {
            this.errorNotifier(err);
            return of(ParentActions.loadAdmissionBasedParentsFailure(err));
          })
        )
      )
    );
  });

  getParentDetailAddress = createEffect(() => {
    return this.actions$.pipe(
      ofType(ParentActions.loadParentDetailAddress),
      switchMap(({ admissionNo }) =>
        this.api.getStudentBasedParentAddressDetails(admissionNo).pipe(
          map((d) => ParentActions.loadParentDetailAddressSuccess({ data: d })),
          catchError((err) => {
            this.errorNotifier(err);
            return of(ParentActions.loadParentDetailAddressFailure(err));
          })
        )
      )
    );
  });

  getAllParentDetails = createEffect(() => {
    return this.actions$.pipe(
      ofType(ParentActions.loadAllParents),
      switchMap((action) =>
        this.api.getAllParentDetails().pipe(
          map((d) => ParentActions.loadAllParentsSuccess(d)),
          catchError((err) => {
            this.errorNotifier(err);
            return of(ParentActions.loadAllParentsFailure(err));
          })
        )
      )
    );
  });

  updateParentDetails = createEffect(() => {
    return this.actions$.pipe(
      ofType(ParentActions.updateParentDetails),
      switchMap((action) =>
        this.api.updateParentDetails(action.data).pipe(
          map((d) => ParentActions.updateParentDetails(d)),
          catchError((err) => {
            this.errorNotifier(err);
            return of(ParentActions.loadAllParentsFailure(err));
          })
        )
      )
    );
  });

  addParentDetails = createEffect(() => {
    return this.actions$.pipe(
      ofType(ParentActions.addParentDetails),
      switchMap((action) =>
        this.api.addParentDetails(action.data).pipe(
          tap((d) =>
            this.notifier.successNotification(
              'Added Parent Details Succesfully'
            )
          ),
          catchError((err) => {
            this.errorNotifier(err);
            return of(ParentActions.loadAllParentsFailure(err));
          })
        )
      )
    );
  });

  deleteParentDetails = createEffect(() => {
    return this.actions$.pipe(
      ofType(ParentActions.deleteParentDetails),
      switchMap((action) =>
        this.api.deleteParentDetails(action.data).pipe(
          tap((d) =>
            this.notifier.successNotification(
              'Deleted Parent Details Succesfully'
            )
          ),
          catchError((err) => {
            this.errorNotifier(err);
            return of(ParentActions.loadAllParentsFailure(err));
          })
        )
      )
    );
  });

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
