import { createAction, props } from '@ngrx/store';

export namespace FeesAction {
  export const loadStudentBasedFees = createAction(
    '[Pages] Load Fees Based On Student Admission',
    props<{ admissionNo: string | number }>()
  );
  export const loadStudentBasedFeesSuccess = createAction(
    '[Pages] Load Fees Based On Student Admission Success',
    props<{ data: any }>()
  );
  export const loadStudentBasedFeesFailure = createAction(
    '[Pages] Load Fees Based On Student Admission Failure',
    props<{ err: any }>()
  );
}
