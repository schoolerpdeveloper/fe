import { createAction, props } from '@ngrx/store';
import { IParentDetailsAddress } from '@shared/models/parentDetailsAdress';

export namespace AddressActions {
  // get all Address
  export const loadAllAddress = createAction('[Pages] Load All Address');

  export const loadAllAddressSuccess = createAction(
    '[Pages] Load All Address Success',
    props<{ data: any }>()
  );

  export const loadAllAddressFailure = createAction(
    '[Pages] Load All Address Failure',
    props<{ error: any }>()
  );

  // get admission based Address details

  export const loadAdmissionBasedAddress = createAction(
    '[Pages] Load Admission Based Address',
    props<{ admissionNo: string | number }>()
  );

  export const loadAdmissionBasedAddressSucess = createAction(
    '[Pages] Load Admission Based Address Success',
    props<{ data: IParentDetailsAddress[] }>()
  );

  export const loadAdmissionBasedAddressFailure = createAction(
    '[Pages] Load Admission Based Address Failure',
    props<{ error: any }>()
  );

  // get single based Address details

  export const loadAddressId = createAction(
    '[Pages] Load Based On Address ID',
    props<{ AddressId: string | number }>()
  );

  export const loadAddressIdSuccess = createAction(
    '[Pages] Load Admission Based On Address ID Success',
    props<{ data: any }>()
  );

  export const loadAddressIdFailure = createAction(
    '[Pages] Load Admission Based On Address ID Failure',
    props<{ error: any }>()
  );

  export const updateAddressDetails = createAction(
    '[Pages] Update AddressDetails',
    props<{data:IParentDetailsAddress}>()
  )
  export const addAddressDetails = createAction(
    '[Pages] Add AddressDetails',
    props<{data:IParentDetailsAddress}>()
  )
}
