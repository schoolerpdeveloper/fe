import { createAction, props } from '@ngrx/store';

export const loadPagess = createAction('[Pages] Load Pagess');

export const loadPagessSuccess = createAction(
  '[Pages] Load Pagess Success',
  props<{ data: any }>()
);

export const loadPagessFailure = createAction(
  '[Pages] Load Pagess Failure',
  props<{ error: any }>()
);

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
