import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPages from '../reducers/app.state';

export const selectPagesState = createFeatureSelector<fromPages.State>(
  fromPages.pagesFeatureKey
);
export const selectAllSibilings  = createSelector(selectPagesState,(state:fromPages.State)=>state.sibilingDetails);
export const slectLoading  = createSelector(selectPagesState,(state:fromPages.State)=>state.loading)
export const selectSingleParent  = createSelector(selectPagesState,(state:fromPages.State)=>state.singleSibilingDetail)
export const selectSibilingDetails  = createSelector(selectPagesState,(state:fromPages.State)=>state.sibilingDetails)
export const selectSibilingDataLoading = createSelector(selectPagesState,(state:fromPages.State)=>state.siblingLoading)


