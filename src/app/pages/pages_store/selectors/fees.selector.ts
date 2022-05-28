import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPages from '../reducers/app.state';

export const selectPagesState = createFeatureSelector<fromPages.State>(
  fromPages.pagesFeatureKey
);
export const selectAllFees  = createSelector(selectPagesState,(state:fromPages.State)=>state.feesDetails);
export const selectFeesDataLoading  = createSelector(selectPagesState,(state:fromPages.State)=>state.feesLoading);
