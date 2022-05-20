import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPages from '../reducers/app.state';

export const selectPagesState = createFeatureSelector<fromPages.State>(
  fromPages.pagesFeatureKey
);

export namespace TransportSelector {
  export const slectBusRouteLoading = createSelector(
    selectPagesState,
    (state: fromPages.State) => state.loading
  );
  export const selectBusRouteCode = createSelector(
    selectPagesState,
    (state: fromPages.State) => state.busRouteCodes
  );
  export const selectBusRouteCodeDetails = createSelector(
    selectPagesState,
    (state: fromPages.State) => state.busRouteCodeDetails
  );
  export const TransportDataLoading = createSelector(
    selectPagesState,
    (state: fromPages.State) => state.transportLoading
  );
}
