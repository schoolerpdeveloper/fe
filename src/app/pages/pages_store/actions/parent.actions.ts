import { createAction, props } from '@ngrx/store';

// get all parents
export const loadAllParents = createAction('[Pages] Load All Parents');

export const loadAllParentsSuccess = createAction(
  '[Pages] Load All Parents Success',
  props<{ data: any }>()
);

export const loadAllParentsFailure = createAction(
  '[Pages] Load All Parents Failure',
  props<{ error: any }>()
);

// get admission based parent details

export const loadAdmissionBasedParents = createAction(
  '[Pages] Load Admission Based Parents',
  props<{ admissionNo: string | number }>()
);

export const loadAdmissionBasedParentsSucess = createAction(
  '[Pages] Load Admission Based Parents Success',
  props<{ data: any }>()
);

export const loadAdmissionBasedParentsFailure = createAction(
  '[Pages] Load Admission Based Parents Failure',
  props<{ error: any }>()
);

// get single based parent details

export const loadParentsId = createAction('[Pages] Load Based On Parents ID', props<{ parentId: string | number }>());

export const loadParentsIdSuccess = createAction(
  '[Pages] Load Admission Based On Parents ID Success',
  props<{ data: any }>()
);

export const loadParentsIdFailure = createAction(
  '[Pages] Load Admission Based On Parents ID Failure',
  props<{ error: any }>()
);
