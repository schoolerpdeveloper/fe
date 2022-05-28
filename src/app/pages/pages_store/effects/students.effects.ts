import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as StudentActions from '../actions/student.actions';
import { StudentdetailsService } from '@shared/services/api/studentDetailsApi/studentdetails.service';
import { NotificationService } from '@shared/services/notification.service';
import {
  IStudentList,
} from '@shared/models/studentDetails/student-details.interface';

@Injectable()
export class StudentEffects {
  getAllStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      concatMap(
        () =>
          this.studentApi.getAllStudentDetails().pipe(
            map((data) => StudentActions.loadStudentSuccess({ data })),
            catchError((error) => {
              this.errorNotifier(error);
              return of(StudentActions.loadStudentFailure({ error }));
            })
          ) // end of api transform
      ) // end of concatmap
    ); // end of action$
  });
  getSingleStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.loadSingleStudents),
      concatMap(
        ({ admissionNumber }) =>
          this.studentApi.getSingleStudentDetails(admissionNumber).pipe(
            map((data) => StudentActions.loadSingleStudentSuccess({ data })),
            catchError((error) => {
              this.errorNotifier(error);
              return of(StudentActions.loadSingleStudentFailure({ error }));
            })
          ) // end of api transform
      ) // end of concatmap
    ); // end of action$
  });

  updateSingleStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.updateStudentDetails),
      switchMap(({ data }) => {
        // return;
        return this.studentApi
          .updateSingleStudentDetails(data.ADMN_NO, data)
          .pipe(
            tap((d) =>
              this.notifier.successNotification(
                'updated student details successfully'
              )
            ),
            catchError((error) => {
              this.errorNotifier(error);
              return of(StudentActions.loadStudentFailure({ error }));
            })
          ); // end of api transform
      }) // end of concatmap
    ); // end of action$
  });

  addSingleStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.addStudentDetails),
      switchMap(({ data }) => {
        // return;
        return this.studentApi.addSingleStudentDetails(data).pipe(
          tap((d) =>
            this.notifier.successNotification(
              'Added student details successfully'
            )
          ),
          catchError((error) => {
            this.errorNotifier(error);
            return of(StudentActions.loadStudentFailure({ error }));
          }),
        ); // end of api transform
      }) // end of switchMap
    ); // end of action$
  });
  studentLists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.loadStudentList),

      concatMap(({}) => {
        // return;
        return this.studentApi.studentListService().pipe(
          map((data) => {
            let temp = data as IStudentList[];
            return StudentActions.loadStudentListSuccess({ studentLists: temp });
          }),
          catchError((error) => {
            this.errorNotifier(error);
            return of(StudentActions.loadStudentListFailure({ error }));
          })
        ); // end of api transform
      }) // end of concatmap
    ); // end of action$
  });

  constructor(
    private actions$: Actions,
    private studentApi: StudentdetailsService,
    private notifier: NotificationService
  ) {}

  errorNotifier(error: any) {
    let { message } = error;
    this.notifier.errorNotification(message);
  }
}
