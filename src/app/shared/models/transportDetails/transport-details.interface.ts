export interface ITransportDeatils
 {
    ID?:                   null | string;
    IS_ACTIVE?:            null | number;
    ADMN_NO?:              null | string;
    BUS_RUTE_CD?:          null | number;
    BUS_RUTE_NO?:          null | string;
    BUS_RUTE_DRIVER_NAME?: null | string;
    BUS_RUTE_DRIVER_NO?:   null | string;
    BUS_RUTE_INCH_NAME?:   null | string;
    BUS_RUTE_INCH_NO?:     null | string;
    BUS_RUTE_INS_DTL?:     null | string;
    LAST_UPDT_TS?:         null | string;
    RUTE_STOP_NO?:null|string;
    bus_route_details?:[]
}
