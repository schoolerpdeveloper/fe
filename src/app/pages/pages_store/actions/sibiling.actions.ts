import { createAction, props } from '@ngrx/store';
import { ISiblingDetails } from '@shared/models/siblingDeatils';

export namespace SibilingActions{
// get all Sibilings
export const loadAllSibilings = createAction('[Pages] Load All Sibilings');

export const loadAllSibilingsSuccess = createAction(
  '[Pages] Load All Sibilings Success',
  props<{ data: any }>()
);

export const loadAllSibilingsFailure = createAction(
  '[Pages] Load All Sibilings Failure',
  props<{ error: any }>()
);

// get admission based parent details

export const loadAdmissionBasedSibilings = createAction(
  '[Pages] Load Admission Based Sibilings',
  props<{ admissionNo: string | number }>()
);

export const loadAdmissionBasedSibilingsSucess = createAction(
  '[Pages] Load Admission Based Sibilings Success',
  props<{ data: ISiblingDetails[] }>()
);

export const loadAdmissionBasedSibilingsFailure = createAction(
  '[Pages] Load Admission Based Sibilings Failure',
  props<{ error: any }>()
);

// get single based parent details

export const loadSibilingsId = createAction('[Pages] Load Based On Sibilings ID', props<{ sibilingId: string | number }>());

export const loadSibilingsIdSuccess = createAction(
  '[Pages] Load Admission Based On Sibilings ID Success',
  props<{ data: any }>()
);

export const loadSibilingsIdFailure = createAction(
  '[Pages] Load Admission Based On Sibilings ID Failure',
  props<{ error: any }>()
);

export const updateSibiling = createAction(
  '[Pages] Update Sibiling details',props<{data:any}>()
)
export const deleteSibiling = createAction(
  '[Pages] Delete Sibiling details',props<{data:any}>()
)
export const addSibiling = createAction(
  '[Pages] Add Sibiling details',props<{data:any}>()
)
}