import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as PagesActions from '../actions/student.actions';
import { studentDetails } from 'src/app/utility/mock/mock.data';
import { StudentdetailsService } from '@shared/services/api/studentDetailsApi/studentdetails.service';
import { NotificationService } from '@shared/services/notification.service';
import { HttpClient } from '@angular/common/http';
import { IStudentDetails, IStudentList } from '@shared/models/studentDetails/student-details.interface';
import { loadSingleStudentSuccess } from '../actions/student.actions';
import { SibilingActions } from '../actions/sibiling.actions';
import { ParentActions } from '../actions/parent.actions';
import { TransportActions } from '../actions/transport.actions';

@Injectable()
export class StudentEffects {
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

  updateSingleStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PagesActions.updateStudentDetails),
      concatMap(({ data }) => {
        // return;
        return this.studentApi
          .updateSingleStudentDetails(data.ADMN_NO, data)
          .pipe(
            // tap((data)=>of(PagesActions.loadStudentList())), //sideeffects for creating Pagesaction
            // concatMap((data) => of(PagesActions.loadStudents())),
            concatMap((data) => of(PagesActions.loadStudentList())),
            catchError((error) => {
              this.errorNotifier(error);
              return of(PagesActions.loadStudentFailure({ error }));
            })
          ); // end of api transform
      }) // end of concatmap
    ); // end of action$
  });

  studentLists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PagesActions.loadStudentList),
      
      concatMap(({  }) => {
        // return;
        return this.studentApi.studentListService().pipe(
          map((data) => {
            let temp = data as IStudentList[];
            return PagesActions.loadStudentListSuccess({ studentLists: temp });
          }),
          catchError((error) => {
            this.errorNotifier(error);
            return of(PagesActions.loadStudentListFailure({ error }));
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