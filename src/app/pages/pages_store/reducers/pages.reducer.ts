import {
  ActionReducerMap,
  createFeature,
  createReducer,
  on,
} from '@ngrx/store';
import { IStudentDetails } from '@shared/models/studentDetails';
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
} from '../actions/pages.actions';

export const pagesFeatureKey = 'pages';

export interface State {
  studentDetails: IStudentDetails[];
  singleStudentDetails: IStudentDetails;

  loading: boolean;
}

export const initialState: State = {
  studentDetails: [],
  singleStudentDetails:{},
  loading: false,
};

export const pageReducer = createReducer(
  initialState,
  on(loadPagess, (state) => ({ ...state, loading: true })),
  on(loadPagessSuccess, (state, { data }) => ({
    ...state,
    studentDetails: data,
    loading: false,
  })),
  on(loadPagessFailure, (state, { error }) => ({
    ...state,
    studentDetails: [],
    loading: false,
  })),
  on(loadStudents, (state) => ({ ...state, loading: true })),
  on(loadStudentSuccess, (state, { data }) => ({
    ...state,
    studentDetails: data,
    loading: false,
  })),
  on(loadStudentFailure, (state, { error }) => ({
    ...state,
    studentDetails: [],
    loading: false,
  })),
  on(loadSingleStudents, (state,action) => ({ ...state, loading: true })),
  on(loadSingleStudentSuccess, (state, { data }) => ({
    ...state,
    singleStudentDetails: data,
    loading: false,
  })),
  on(loadSingleStudentFailure, (state, { error }) => ({
    ...state,
    singleStudentDetails: {},
    loading: false,
  }))
);
export const reducer2 = createReducer(initialState);
