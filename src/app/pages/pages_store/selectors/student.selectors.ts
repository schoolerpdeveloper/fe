import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPages from '../reducers/app.state';

export const selectPagesState = createFeatureSelector<fromPages.State>(
  fromPages.pagesFeatureKey
);
export const selectAllStudents  = createSelector(selectPagesState,(state:fromPages.State)=>state.studentDetails);
export const slectLoading  = createSelector(selectPagesState,(state:fromPages.State)=>state.loading)
export const selectSingleStudents  = createSelector(selectPagesState,(state:fromPages.State)=>state.singleStudentDetails)
export const selectStudentLists  = createSelector(selectPagesState,(state:fromPages.State)=>state.studentLists)
export const studentDataLoading = createSelector(selectPagesState,(state:fromPages.State)=>state.studentLoading)


