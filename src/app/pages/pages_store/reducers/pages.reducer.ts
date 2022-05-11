import {
  ActionReducerMap,
  createFeature,
  createReducer,
  on,
} from '@ngrx/store';
import { IStudentDetails } from '@shared/models/studentDetails';
import { IStudentList } from '@shared/models/studentDetails/student-details.interface';
import {
  loadPagess,
  loadPagessSuccess,
  loadPagessFailure,
  loadStudents,
  loadStudentSuccess,
  loadStudentFailure,
  loadSingleStudents,
  loadSingleStudentSuccess,
  loadSingleStudentFailure,
  loadStudentList,
  loadStudentListSuccess,
} from '../actions/pages.actions';

export const pagesFeatureKey = 'pages';

export interface State {
  studentDetails: IStudentDetails[];
  singleStudentDetails: IStudentDetails;
  loading: boolean;
  studentLists: IStudentList[];
}

export const initialState: State = {
  studentDetails: [],
  singleStudentDetails: {},
  loading: false,
  studentLists: [],
};

export const pageReducer = createReducer(
  initialState,
  on(loadStudents, (state) => ({ ...state, loading: true })),
  on(loadStudentSuccess, (state, { data }) => ({
    ...state,
    studentDetails: data,
    loading: false,
  })),
  on(loadStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
  })),
  on(loadSingleStudents, (state, action) => ({ ...state, loading: true })),
  on(loadSingleStudentSuccess, (state, { data }) => ({
    ...state,
    singleStudentDetails: data,
    loading: false,
  })),
  on(loadSingleStudentFailure, (state, { error }) => ({
    ...state,
    singleStudentDetails: {},
    loading: false,
  })),
  on(loadStudentList, (state, action) => ({ ...state, loading: true })),
  on(loadStudentListSuccess, (state, { studentLists }) => ({
    ...state,
    loading: false,
    studentLists:studentLists,
  })),
  on(loadSingleStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
  }))
);
// export const reducer2 = createReducer(initialState);
