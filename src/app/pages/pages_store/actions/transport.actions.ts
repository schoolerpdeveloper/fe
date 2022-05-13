import { createAction, props } from '@ngrx/store';

export namespace TransportActions {
  // get all BusRoute
  export const loadAllBusRoute = createAction('[Pages] Load All BusRoute');

  export const loadAllBusRouteSuccess = createAction(
    '[Pages] Load All BusRoute Success',
    props<{ data: any }>()
  );

  export const loadAllBusRouteFailure = createAction(
    '[Pages] Load All BusRoute Failure',
    props<{ error: any }>()
  );

  // get admission based parent details

  export const loadAdmissionBasedBusRoute = createAction(
    '[Pages] Load Admission Based BusRoute',
    props<{ admissionNo: string | number }>()
  );

  export const loadAdmissionBasedBusRouteSucess = createAction(
    '[Pages] Load Admission Based BusRoute Success',
    props<{ data: any }>()
  );

  export const loadAdmissionBasedBusRouteFailure = createAction(
    '[Pages] Load Admission Based BusRoute Failure',
    props<{ error: any }>()
  );

  // get single based parent details

  export const loadBusRouteId = createAction(
    '[Pages] Load Based On BusRoute ID',
    props<{ busRouteCode: string | number }>()
  );

  export const loadBusRouteIdSuccess = createAction(
    '[Pages] Load Admission Based On BusRoute ID Success',
    props<{ data: any }>()
  );

  export const loadBusRouteIdFailure = createAction(
    '[Pages] Load Admission Based On BusRoute ID Failure',
    props<{ error: any }>()
  );
}
