export interface IBusDetails {
  BUS_RUTE_CD?: string;
  BUS_RUTE_NO?: string;
  BUS_RUTE_DRIVER_NAME?: string;
  BUS_RUTE_DRIVER_NO?: Date | null;
  BUS_RUTE_INCH_NAME?: null | string;
  BUS_RUTE_INCH_NO?: null | string;
  BUS_RUTE_INS_DTL?: null | string;
  BUS_INSURANCE_DETAILS?: null | string;
  BUS_FC_DETAILS?: null | string;
  BUS_CLEANER_NAME?: null | string;
  BUS_CLEANER_MOBILE_NO?: Date | null;
  BUS_CAMERA_DETAILS?: null | string;
  BUS_GPRS_DETAILS?: null | string;
  BUS_SEAT_CAPACITY?: null | string;
  COMMENTS?: null | string;
  LAST_UPDT_TS?: null | string;
}

export interface IStudentList {
  STUD_FIRST_NAME?: string;
  STUD_LAST_NAME?: string;
  ADMN_NO?: string;
  STUD_CLASS?: string;
  CLASS_NAME?: string;
  BUS_RUTE_CD?: string;
  FEES_PAID?: number;
  TOTAL_FEES_AMOUNT?: string;
  IS_ACTIVE?: string;
  FEES_STATUS?: string;
  percentage?:string;
}
