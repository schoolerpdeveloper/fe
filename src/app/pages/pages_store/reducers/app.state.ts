import { IParentDetails } from '@shared/models/parentDetails';
import { IParentDetailsAddress } from '@shared/models/parentDetailsAdress';
import { ISiblingDetails } from '@shared/models/siblingDeatils';
import { IStudentDetails } from '@shared/models/studentDetails';
import { IStudentList } from '@shared/models/studentDetails/student-details.interface';
import { ITransportDeatils } from '@shared/models/transportDetails';
import { IClassConfigUtility } from '@shared/models/utilityInterfaces/classConfig.model';

export interface State {
  studentDetails: IStudentDetails[];
  singleStudentDetails: IStudentDetails;
  loading: boolean;
  studentLoading: boolean;
  transportLoading: boolean;
  utilLoading: boolean;
  studentLists: IStudentList[];
  busRouteCodes: string | number;
  busRouteCodeDetails: ITransportDeatils[];
  parentDetails: IParentDetails[];
  addressDetails: IParentDetailsAddress[];
  singleParentDetail: IParentDetails;
  singleSibilingDetail: ISiblingDetails;
  singleAddressDetails: IParentDetailsAddress;
  sibilingDetails: ISiblingDetails[];
  parentLoading: boolean;
  siblingLoading: boolean;
  allDetailsOfStudents: { [key: string]: any };
  classConfigUtility: IClassConfigUtility[];
}

export const initialState: State = {
  studentDetails: [],
  singleStudentDetails: {},
  studentLists: [],
  busRouteCodes: '',
  busRouteCodeDetails: [],
  parentDetails: [],
  sibilingDetails: [],
  allDetailsOfStudents: {},
  classConfigUtility: [],
  addressDetails: [],
  singleAddressDetails: {},
  singleParentDetail: {},
  singleSibilingDetail: {},
  /**boolean flags maintained for each file */
  loading: false,
  studentLoading: false,
  transportLoading: false,
  utilLoading: false,
  parentLoading: false,
  siblingLoading: false,
  /**boolean flags maintained for each file */
};

export const pagesFeatureKey = 'pages';
