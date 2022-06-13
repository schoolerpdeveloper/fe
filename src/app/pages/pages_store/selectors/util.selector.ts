import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPages from '../reducers/app.state';

export const selectPagesState = createFeatureSelector<fromPages.State>(
  fromPages.pagesFeatureKey
);

export namespace UtilSelector {

    export const selectUtilLoading = createSelector(
        selectPagesState,
        (state: fromPages.State) => state.utilLoading
      );

      export const selectClassConfig = createSelector(
        selectPagesState,
        (state: fromPages.State) => state.classConfigUtility
      );
}