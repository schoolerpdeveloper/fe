import { IFeesDeatils } from "./feesDetails";
import { IParentDetails } from "./parentDetails";
import { ISiblingDetails } from "./siblingDeatils";
import { IStudentDetails } from "./studentDetails";
import { ITransportDeatils } from "./transportDetails";

export interface IModalWindowConf {
    modalTitle: string;
    formType: 'parent' | 'sibiling' | 'transport' | 'fees' | 'student';
    data:
      | IParentDetails
      | ISiblingDetails
      | IStudentDetails
      | ITransportDeatils
      | IFeesDeatils
      | null
    loadForms: boolean;
    action:'add'|'update'|'delete'
  }
  