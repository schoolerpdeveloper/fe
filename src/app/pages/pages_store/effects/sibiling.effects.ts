import { Injectable } from '@angular/core';
import { Actions, ofType,createEffect } from '@ngrx/effects';

import { NotificationService } from '@shared/services/notification.service';
import { SibilingApiService } from '@shared/services/api/sibilingDetailsApi/sibiling-api.service';

import { catchError,  concatMap,  map, switchMap } from 'rxjs/operators';
import { SibilingActions } from '../actions/sibiling.actions';
import { of } from 'rxjs';
import { ISiblingDetails } from '@shared/models/siblingDeatils';

@Injectable()
export class SibilingEffects {

  studentBasedSibilingDetails$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(SibilingActions.loadAdmissionBasedSibilings),
      concatMap(({admissionNo})=>{
        return this.api.getStudentsiblingdetails(admissionNo).pipe(
          map((data:ISiblingDetails[])=>SibilingActions.loadAdmissionBasedSibilingsSucess({data})),
          catchError((err:any)=>{
            this.errorNotifier(err);
            return of(SibilingActions.loadAdmissionBasedSibilingsFailure(err));
          })
        )
      })
    ) 
  })

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
