import { createAction, props } from '@ngrx/store';

export namespace UtilityActions {
    export const loadClassConfig =  createAction('[Pages] Class config  utility')
    export const onClassConfigSuccess =  createAction('[Pages] Class config  utility Success',props<{data:any}>())
    export const onClassConfigFailure =  createAction('[Pages] Class config  utility Failure',props<{err:any}>())


}