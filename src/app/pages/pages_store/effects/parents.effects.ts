import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { NotificationService } from '@shared/services/notification.service';
import { ParentApiService } from '@shared/services/api/parentDetailsApi/parent-api.service';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ParentActions } from '../actions/parent.actions';
import { of } from 'rxjs';

@Injectable()
export class ParentEffects {
  studentBasedParentDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ParentActions.loadAdmissionBasedParents),
      switchMap((action) =>
        this.api.getStudentParentDetails(action.admissionNo).pipe(
          map((d) => ParentActions.loadAdmissionBasedParentsSucess(d)),
          catchError((err) => {
            this.errorNotifier(err);
            return of(ParentActions.loadAdmissionBasedParentsFailure(err));
          })
        )
      )
    );
  });


  getAllParentDetails = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ParentActions.loadAllParents),
      switchMap((action)=>this.api.getAllParentDetails().pipe(
        map((d)=>ParentActions.loadAllParentsSuccess(d)),
        catchError((err)=>{
          this.errorNotifier(err);
          return of(ParentActions.loadAllParentsFailure(err))
        })

      ))
    )
  })

  updateParentDetails = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ParentActions.updateParentDetails),
      switchMap((action)=>this.api.updateParentDetails(action.data).pipe(
        
      ))
    )
  })

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
