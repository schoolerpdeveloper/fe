import { createAction, props } from '@ngrx/store';
import { IStudentList } from '@shared/models/studentDetails/student-details.interface';



export const loadStudents = createAction('[Pages] Load Students');

export const loadStudentSuccess = createAction(
  '[Pages] Load Student Success',
  props<{ data: any }>()
);

export const loadStudentFailure = createAction(
  '[Pages] Load Student Failure',
  props<{ error: any }>()
);

export const loadSingleStudents = createAction(
  '[Pages] Load Single Students',
  props<{ admissionNumber: any }>()
);
export const loadSingleStudentSuccess = createAction(
  '[Pages] Load Single Student Success',
  props<{ data: any }>()
);
export const loadSingleStudentFailure = createAction(
  '[Pages] Load Single Student Failure',
  props<{ error: any }>()
);

export const updateStudentDetails = createAction(
  '[Page] Load Single Student Update',
  props<{ data: any }>()
);

export const loadStudentList = createAction(
  '[Page] Load Student List Features'
);
export const loadStudentListSuccess = createAction(
  '[Page] Load Student List Success Features',
  props<{ studentLists: IStudentList[] }>()
);

export const loadStudentListFailure = createAction(
  '[Page] Load Student List Failure Features',
  props<{ error: any }>()
);


