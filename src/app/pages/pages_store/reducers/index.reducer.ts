import {
  ActionReducerMap,
  createFeature,
  createReducer,
  on,
} from "@ngrx/store";
import { IStudentDetails } from "@shared/models/studentDetails";
import { IStudentList } from "@shared/models/studentDetails/student-details.interface";
import { ITransportDeatils } from "@shared/models/transportDetails";
import { TransportActions } from "../actions/transport.actions";
import {
  loadStudents,
  loadStudentSuccess,
  loadStudentFailure,
  loadSingleStudents,
  loadSingleStudentSuccess,
  loadSingleStudentFailure,
  loadStudentList,
  loadStudentListSuccess,
} from "../actions/student.actions";

export const pagesFeatureKey = "pages";

export interface State {
  studentDetails: IStudentDetails[];
  singleStudentDetails: IStudentDetails;
  loading: boolean;
  studentLists: IStudentList[];
  busRouteCodes:string|number,
  busRouteCodeDetails:ITransportDeatils[]
}

export const initialState: State = {
  studentDetails: [],
  singleStudentDetails: {},
  loading: false,
  studentLists: [],
  busRouteCodes:'',
  busRouteCodeDetails:[]
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
    studentLists: studentLists,
  })),
  on(loadSingleStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
  })),
// bus Route handlings
  on(TransportActions.loadBusRouteId, (state, { busRouteCode }) => ({
    ...state,
    loading: true,
    busRouteCodes:busRouteCode
  })),
  on(TransportActions.loadBusRouteIdSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    busRouteCodeDetails:data
  })),
  on(TransportActions.loadBusRouteIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
  }))
);
// export const reducer2 = createReducer(initialState);
