import {
  ActionReducerMap,
  createFeature,
  createReducer,
  on,
} from '@ngrx/store';
import { IStudentDetails } from '@shared/models/studentDetails';
import { IStudentList } from '@shared/models/studentDetails/student-details.interface';
import { ITransportDeatils } from '@shared/models/transportDetails';
import { TransportActions } from '../actions/transport.actions';
import {
  loadStudents,
  loadStudentSuccess,
  loadStudentFailure,
  loadSingleStudents,
  loadSingleStudentSuccess,
  loadSingleStudentFailure,
  loadStudentList,
  loadStudentListSuccess,
  loadAllDetailsRelatedToStudent,
} from '../actions/student.actions';
import { IParentDetails } from '@shared/models/parentDetails';
import { ISiblingDetails } from '@shared/models/siblingDeatils';
import { IClassConfigUtility } from '@shared/models/utilityInterfaces/classConfig.model';
import { UtilityActions } from '../actions/util.actions';
import { initialState } from './app.state';

export const pageReducer = createReducer(
  initialState,
  on(loadStudents, (state) => ({ ...state, studentLoading: true })),
  on(loadStudentSuccess, (state, { data }) => ({
    ...state,
    studentDetails: data,
    studentLoading: false,
  })),
  on(loadStudentFailure, (state, { error }) => ({
    ...state,
    studentLoading: false,
  })),
  on(loadSingleStudents, (state, action) => ({
    ...state,
    studentLoading: true,
  })),
  on(loadSingleStudentSuccess, (state, { data }) => {
    return {
      ...state,
      singleStudentDetails: data,
      studentLoading: false,
    };
  }),
  on(loadSingleStudentFailure, (state, { error }) => ({
    ...state,
    singleStudentDetails: {},
    studentLoading: false,
  })),
  on(loadStudentList, (state, action) => ({ ...state, studentLoading: true })),
  on(loadStudentListSuccess, (state, { studentLists }) => ({
    ...state,
    studentLoading: false,
    studentLists: studentLists,
  })),
  on(loadSingleStudentFailure, (state, { error }) => ({
    ...state,
    studentLoading: false,
  })),
  // bus Route handlings
  on(TransportActions.loadBusRouteId, (state, { busRouteCode }) => ({
    ...state,
    transportLoading: true,
    busRouteCodes: busRouteCode,
  })),
  on(TransportActions.loadBusRouteIdSuccess, (state, { data }) => ({
    ...state,
    transportLoading: false,
    busRouteCodeDetails: data,
  })),
  on(TransportActions.loadBusRouteIdFailure, (state, { error }) => ({
    ...state,
    transportLoading: false,
  })),
  on(UtilityActions.loadClassConfig, (state) => ({
    ...state,
    utilLoading: true,
  })),
  on(UtilityActions.onClassConfigSuccess, (state, { data }) => ({
    ...state,
    classConfigUtility: data,
    utilLoading: false,
  })),
  on(UtilityActions.onClassConfigFailure, (state) => ({
    ...state,
    utilLoading: false,
  }))
);
