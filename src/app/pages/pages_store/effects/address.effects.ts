import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { NotificationService } from '@shared/services/notification.service';
import { ParentApiService } from '@shared/services/api/parentDetailsApi/parent-api.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AddressActions } from '../actions/address.actions';
import { EMPTY, of } from 'rxjs';
import { IParentDetails } from '@shared/models/parentDetails';
import { IParentDetailsAddress } from '@shared/models/parentDetailsAdress';

@Injectable()
export class AddressEffects {
  studentBasedParentAddressDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddressActions.loadAdmissionBasedAddress),
      switchMap(({ admissionNo }) =>
        this.api.getStudentBasedParentAddressDetails(admissionNo).pipe(
          map((d: IParentDetailsAddress[]) =>
            AddressActions.loadAdmissionBasedAddressSucess({ data: d })
          ),
          catchError((err) => {
            this.errorNotifier(err);
            return of(AddressActions.loadAdmissionBasedAddressFailure(err));
          })
        )
      )
    );
  });
  updateParentAddressDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddressActions.updateAddressDetails),
      switchMap((action) =>
        this.api.updateAddress(action.data).pipe(
          tap((d) => {
            this.notifier.successNotification('Updated Successfully');
          }),
          catchError((err) => {
            this.errorNotifier(err);
            return EMPTY;
          })
        )
      )
    );
  });
  addAddressDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddressActions.addAddressDetails),
      switchMap((action) =>
        this.api.updateAddress(action.data).pipe(
          tap((d) => {
            this.notifier.successNotification('Added Successfully');
          }),
          catchError((err) => {
            this.errorNotifier(err);
            return EMPTY;
          })
        )
      )
    );
  });
  addParentAddressDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddressActions.addAddressDetails),
      switchMap((action) =>
        this.api.addAddress(action.data).pipe(
          tap((d) => {
            this.notifier.successNotification('Added Successfully');
          }),
          catchError((err) => {
            this.errorNotifier(err);
            return EMPTY;
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
