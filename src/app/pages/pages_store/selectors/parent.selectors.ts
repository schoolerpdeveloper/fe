import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPages from '../reducers/app.state';

export const selectPagesState = createFeatureSelector<fromPages.State>(
  fromPages.pagesFeatureKey
);
export const selectAllParents  = createSelector(selectPagesState,(state:fromPages.State)=>state.parentDetails);
export const slectLoading  = createSelector(selectPagesState,(state:fromPages.State)=>state.loading)
export const selectSingleParent  = createSelector(selectPagesState,(state:fromPages.State)=>state.singleParentDetail)
export const selectParentDetails  = createSelector(selectPagesState,(state:fromPages.State)=>state.parentDetails)
export const parentDataLoading = createSelector(selectPagesState,(state:fromPages.State)=>state.parentLoading)


