import { createAction, props } from '@ngrx/store';
import { IParentDetails } from '@shared/models/parentDetails';
import { IParentDetailsAddress } from '@shared/models/parentDetailsAdress';
import { IParentAddressDetails } from '@shared/models/parentDetailsAdress/parent-details-address.interface';

export namespace ParentActions {
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
    props<{ data: IParentDetails[] }>()
  );

  export const loadAdmissionBasedParentsFailure = createAction(
    '[Pages] Load Admission Based Parents Failure',
    props<{ error: any }>()
  );

  // get single based parent details

  export const loadParentsId = createAction(
    '[Pages] Load Based On Parents ID',
    props<{ parentId: string | number }>()
  );

  export const loadParentsIdSuccess = createAction(
    '[Pages] Load Admission Based On Parents ID Success',
    props<{ data: any }>()
  );

  export const loadParentsIdFailure = createAction(
    '[Pages] Load Admission Based On Parents ID Failure',
    props<{ error: any }>()
  );

  export const updateParentDetails = createAction(
    '[Pages] Update ParentDetails',
    props<{ data: IParentDetails }>()
  );
  export const addParentDetails = createAction(
    '[Pages] Add ParentDetails',
    props<{ data: IParentDetails }>()
  );
  export const deleteParentDetails = createAction(
    '[Pages] Delete ParentDetails',
    props<{ data: IParentDetails }>()
  );
  export const loadParentDetailAddress = createAction(
    '[Pages] Parent Detail Address',
    props<{ admissionNo: number | string }>()
  );

  export const loadParentDetailAddressSuccess = createAction(
    '[Pages] Parent Detail Address Success',
    props<{ data : IParentAddressDetails[]}>()
  );

  export const loadParentDetailAddressFailure = createAction(
    '[Pages] Parent Detail Address Failure',
    props<{ data : IParentAddressDetails[]}>()
  );
  
}
