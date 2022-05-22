import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPages from '../reducers/app.state';

export const selectPagesState = createFeatureSelector<fromPages.State>(
  fromPages.pagesFeatureKey
);
export const selectAllAddress  = createSelector(selectPagesState,(state:fromPages.State)=>state.addressDetails);
export const slectLoading  = createSelector(selectPagesState,(state:fromPages.State)=>state.loading)
export const selectSingleParentAddress  = createSelector(selectPagesState,(state:fromPages.State)=>state.addressDetails)
// export const selectParentAddressDetails  = createSelector(selectPagesState,(state:fromPages.State)=>state.parentDetails)
// export const parentDataLoading = createSelector(selectPagesState,(state:fromPages.State)=>state.parentLoading)


