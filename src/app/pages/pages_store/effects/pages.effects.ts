import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as PagesActions from '../actions/pages.actions';
import { studentDetails } from 'src/app/utility/mock/mock.data';
import { StudentdetailsService } from '@shared/services/api/studentDetailsApi/studentdetails.service';
import { NotificationService } from '@shared/services/notification.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PagesEffects {
  getAllStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PagesActions.loadStudents),
      concatMap(
        () =>
          this.studentApi.getAllStudentDetails().pipe(
            map((data) => PagesActions.loadStudentSuccess({ data })),
            catchError((error) => {
              this.errorNotifier(error);
              return of(PagesActions.loadStudentFailure({ error }));
            })
          ) // end of api transform
      ) // end of concatmap
    ); // end of action$
  });
  getSingleStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PagesActions.loadSingleStudents),
      concatMap(
        ({ admissionNumber }) =>
          this.studentApi.getSingleStudentDetails(admissionNumber).pipe(
            map((data) => PagesActions.loadSingleStudentSuccess({ data })),
            catchError((error) => {
              this.errorNotifier(error);
              return of(PagesActions.loadSingleStudentFailure({ error }));
            })
          ) // end of api transform
      ) // end of concatmap
    ); // end of action$
  });

  constructor(
    private actions$: Actions,
    private studentApi: StudentdetailsService,
    private notifier: NotificationService
  ) {}

  errorNotifier(error: any) {
    let {message} = error
    this.notifier.errorNotification(message);
  }
}
