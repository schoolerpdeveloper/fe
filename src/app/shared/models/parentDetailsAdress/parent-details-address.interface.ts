export interface IParentDetailsAddress {
  ID?: string | null;
  ADMN_NO?: string | null;
  PRNT_ADRS_CD?: string|number | null;
  PRNT_ADRS_ADD1?: string | null;
  PRNT_ADRS_ADD2?: string | null;
  PRNT_ADRS_ADD3?: string | null;
  PRNT_ADRS_ADD4?: string | null;
  PRNT_ADRS_ADD5?: string | null;
  PRNT_ADRS_DIST?: string | null;
  PRNT_ADRS_PSTL_CD?: string | null;
  LAST_UPDT_TS?: string | null;
  CRET_TS?: string | null;
  address_details?:IParentDetailsAddress
}

export interface IParentAddressDetails {
  ID?:              number;
  ADMN_NO?:         string;
  PRNT_CD?:         number;
  FIRST_NAME?:      string;
  LAST_NAME?:       string;
  PRNT_EDUC?:       string;
  PRNT_OCCU?:       string;
  PRNT_AADH_NO?:    string;
  PRNT_PHNE_NO?:    string;
  PRNT_EMAIL_ID?:   string;
  LAST_UPDT_TS?:    Date;
  address_details?: AddressDetail[];
}

export interface AddressDetail {
  ID?:                number;
  ADMN_NO?:           string;
  PRNT_ADRS_CD?:      number;
  PRNT_ADRS_ADD1?:    string;
  PRNT_ADRS_ADD2?:    string;
  PRNT_ADRS_ADD3?:    string;
  PRNT_ADRS_ADD4?:    string;
  PRNT_ADRS_ADD5?:    null;
  PRNT_ADRS_DIST?:    null;
  PRNT_ADRS_PSTL_CD?: null;
  LAST_UPDT_TS?:      Date;
  CRET_TS?:           null;
}
