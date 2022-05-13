export interface IStudentDetails {
    SCHOOL_ID?:       number;
    ACADEMIC_ID?:     number;
    ADMN_NO?:         string;
    ADMIN_DATE?:      Date | null;
    STUD_FIRST_NAME?: null | string;
    STUD_CLASS?:      null | string;
    STUD_LAST_NAME?:  null | string;
    STUD_FATH_NAME?:  null | string;
    STUD_MTHR_NAME?:  null | string;
    STUD_GNDR?:       null | string;
    STUD_DOB?:        Date | null;
    STUD_CASTE?:      null | string;
    STUD_SUB_CASTE?:  null | string;
    STUD_CMTY?:       null | string;
    STUD_RLIG?:       null | string;
    STUD_NTLY?:       null | string;
    STUD_MTHR_TNGE?:  null | string;
    STUD_LNG_KNWN?:   null | string;
    STUD_BLD_GRUP?:   null | string;
    STUD_AHAR_NO?:    null | string;
    STUD_EMIS_NO?:    null | string;
    STUD_PREV_SCHL?:  null | string;
    STUD_DISCOUNT?:   number | null;
    STUD_IS_ACTIVE?:  boolean;
    CRET_TS?:         null;
    LAST_UPDT_TS?:    null;
}


export interface IStudentList{
    STUD_FIRST_NAME?:   string;
    STUD_LAST_NAME?:    string;
    ADMN_NO?:           string;
    STUD_CLASS?:        string;
    CLASS_NAME?:        string;
    BUS_RUTE_CD?:       string;
    FEES_PAID?:         number;
    TOTAL_FEES_AMOUNT?: string;
    IS_ACTIVE?:string;
    FEES_STATUS?:string;
}