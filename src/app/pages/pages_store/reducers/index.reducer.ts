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
import { ParentActions } from '../actions/parent.actions';
import { SibilingActions } from '../actions/sibiling.actions';
import { AddressActions } from '../actions/address.actions';
import { FeesAction } from '../actions/fees.actions';

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
  on(TransportActions.loadAllBusRoute, (state, action) => ({
    ...state,
    transportLoading: true,
  })),
  on(TransportActions.loadAllBusRouteSuccess, (state, { data }) => ({
    ...state,
    transportLoading: false,
    busRouteCodeDetails: data,
  })),
  on(TransportActions.loadAllBusRouteFailure, (state, action) => ({
    ...state,
    transportLoading: false,
  })),
  //parents
  on(ParentActions.loadAdmissionBasedParents, (state, action) => ({
    ...state,
    parentLoading: true,
  })),
  on(ParentActions.loadAdmissionBasedParentsSucess, (state, { data }) => ({
    ...state,
    parentLoading: false,
    parentDetails: data,
  })),
  on(ParentActions.loadAdmissionBasedParentsFailure, (state, { error }) => ({
    ...state,
    parentLoading: false,
  })),
  on(ParentActions.loadParentDetailAddress, (state, action) => {
    return { ...state, parentLoading: true };
  }),
  on(ParentActions.loadParentDetailAddressSuccess, (state, { data }) => {
    return { ...state, parentLoading: false, parentAddressDetails: data };
  }),
  on(ParentActions.loadParentDetailAddressFailure, (state, action) => {
    return { ...state, parentLoading: false };
  }),
  //address
  on(AddressActions.loadAdmissionBasedAddress, (state, action) => ({
    ...state,
    parentLoading: true,
  })),
  on(AddressActions.loadAdmissionBasedAddressSucess, (state, { data }) => ({
    ...state,
    parentLoading: false,
    addressDetails: data,
  })),
  on(AddressActions.loadAdmissionBasedAddressFailure, (state, { error }) => ({
    ...state,
    parentLoading: false,
  })),
  //sibiling
  on(SibilingActions.loadAdmissionBasedSibilings, (state, action) => ({
    ...state,
    siblingLoading: true,
  })),
  on(SibilingActions.loadAdmissionBasedSibilingsSucess, (state, { data }) => ({
    ...state,
    siblingLoading: false,
    sibilingDetails: data,
  })),
  on(
    SibilingActions.loadAdmissionBasedSibilingsFailure,
    (state, { error }) => ({
      ...state,
      siblingLoading: false,
    })
  ),
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
  })),
  on(FeesAction.loadStudentBasedFees, (state) => ({
    ...state,
    feesLoading: true,
  })),
  on(FeesAction.loadStudentBasedFeesFailure, (state, { err }) => ({
    ...state,
    feesLoading: false,
  })),
  on(FeesAction.loadStudentBasedFeesSuccess, (state, { data }) => ({
    ...state,
    feesLoading: false,
    feesDetails: data,
  }))
);
