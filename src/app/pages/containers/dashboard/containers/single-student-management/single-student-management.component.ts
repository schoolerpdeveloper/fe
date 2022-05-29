import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { Store } from '@ngrx/store';
import { IFeesDeatils } from '@shared/models/feesDetails';
import { IModalWindowConf } from '@shared/models/modal.win.interface';
import { IParentDetails } from '@shared/models/parentDetails';
import { IParentAddressDetails } from '@shared/models/parentDetailsAdress/parent-details-address.interface';
import { ISiblingDetails } from '@shared/models/siblingDeatils';
import { IStudentDetails } from '@shared/models/studentDetails';
import { ITransportDeatils } from '@shared/models/transportDetails';
import { takeUntil, map, tap } from 'rxjs/operators';
import { RouterEnum } from 'src/app/enums/router.enum';
import { AddressActions } from 'src/app/pages/pages_store/actions/address.actions';
import { FeesAction } from 'src/app/pages/pages_store/actions/fees.actions';
import { ParentActions } from 'src/app/pages/pages_store/actions/parent.actions';
import { SibilingActions } from 'src/app/pages/pages_store/actions/sibiling.actions';
import * as StudentAction from 'src/app/pages/pages_store/actions/student.actions';
import { TransportActions } from 'src/app/pages/pages_store/actions/transport.actions';
import { UtilityActions } from 'src/app/pages/pages_store/actions/util.actions';
import {
  selectAllFees,
  selectFeesDataLoading,
} from 'src/app/pages/pages_store/selectors/fees.selector';
import {
  parentDataLoading,
  selectParentAddressDetails,
} from 'src/app/pages/pages_store/selectors/parent.selectors';
import {
  selectSibilingDataLoading,
  selectSibilingDetails,
} from 'src/app/pages/pages_store/selectors/sibiling.selectors';
import {
  selectAllStudents,
  selectSingleStudents,
  studentDataLoading,
} from 'src/app/pages/pages_store/selectors/student.selectors';
import { TransportSelector } from 'src/app/pages/pages_store/selectors/transport.selector';
import { ConfiguredModalComponent } from '../../components/configured-modal/configured-modal.component';

@Component({
  selector: 'app-single-student-management',
  templateUrl: './single-student-management.component.html',
  styleUrls: ['./single-student-management.component.scss'],
  providers: [
    AutoUnSubscribeService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
})
export class SingleStudentManagementComponent implements OnInit {
  admissionNo!: string | number;
  stoppageNo!: string | number;

  studentlist!: IStudentDetails;
  parentdetails: IParentDetails[] = [];
  parentAddressdetails: IParentAddressDetails[] = [];
  feesdetails: IFeesDeatils[] = [];
  sibilingdetails: ISiblingDetails[] = [];
  transportdetails: ITransportDeatils[] = [];
  studentLoading$ = this.store.select(studentDataLoading);
  parentLoading$ = this.store.select(parentDataLoading);
  sibLoading$ = this.store.select(selectSibilingDataLoading);
  feesLoading$ = this.store.select(selectFeesDataLoading);

  selectAllStudents$ = this.store.select(selectAllStudents).pipe(
    tap((d) => console.log(d)),
    map((d) => d.map((i) => i.ADMN_NO))
  );

  constructor(
    private store: Store,
    private actRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private destroy$: AutoUnSubscribeService
  ) {
    let adNo = this.actRoute.snapshot.params;
    this.admissionNo = adNo?.['admissionNo'] as string | number;
  }

  ngOnInit(): void {
    this.store
      .select(selectSingleStudents)
      .pipe(
        takeUntil(this.destroy$),
        tap((data: IStudentDetails) => {
          if (data?.BUS_RUTE_CD) this.loadBusRouteDetails(data.BUS_RUTE_CD);
        })
      )
      .subscribe((d) => {
        this.studentlist = { ...d };
        this.stoppageNo = d?.RUTE_STOP_NO ? d?.RUTE_STOP_NO : -1;
      });
    this.store
      .select(selectParentAddressDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d: any) => {
        this.parentAddressdetails = d.map((i: any) => {
          let temp = { ...i };
          temp['address_details'] = i['address_details'][0];
          return temp;
        });
      });

    this.store
      .select(selectSibilingDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.sibilingdetails = [...d];
      });
    this.store
      .select(selectAllFees)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.feesdetails = [...d];
      });
    this.store
      .select(TransportSelector.selectBusRouteCodeDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.transportdetails = [...d];
      });
    this.store.dispatch(UtilityActions.loadClassConfig());
    this.initAllSingleStudentDetails();
  }
  initAllSingleStudentDetails() {
    this.loadSingleStudents();
    this.loadSingleStudentsSibilings();
    this.loadSingleStudentsParentAddressDetails();
    this.loadSingleFeesStudentsDetails();
  }

  captureAdmissionNo(e: any) {
    let val = e?.target.value;
    this.router.navigate(
      [
        RouterEnum.CONTAINER,
        RouterEnum.DASHBOARD,
        RouterEnum.STUDENT_MANAGEMENT,
        val,
      ],
      { replaceUrl: true }
    );
  }
  loadSingleStudents() {
    this.store.dispatch(
      StudentAction.loadSingleStudents({ admissionNumber: this.admissionNo })
    );
  }

  loadTransportDetails(routeCode: number | string) {
    this.store.dispatch(
      TransportActions.loadBusRouteId({ busRouteCode: routeCode })
    );
  }

  loadSingleStudentsSibilings() {
    this.store.dispatch(
      SibilingActions.loadAdmissionBasedSibilings({
        admissionNo: this.admissionNo,
      })
    );
  }
  loadSingleStudentsParentAddressDetails() {
    this.store.dispatch(
      ParentActions.loadParentDetailAddress({ admissionNo: this.admissionNo })
    );
  }
  loadSingleFeesStudentsDetails() {
    this.store.dispatch(
      FeesAction.loadStudentBasedFees({
        admissionNo: this.admissionNo,
      })
    );
  }

  loadBusRouteDetails(busRouteCode: string) {
    this.store.dispatch(TransportActions.loadBusRouteId({ busRouteCode }));
  }

  navigateToList() {
    this.router.navigate([
      RouterEnum.CONTAINER,
      RouterEnum.DASHBOARD,
      RouterEnum.STUDENT_MANAGEMENT,
    ]);
  }
  studentFormEvtHandler(e: {
    action: 'add' | 'update' | 'delete';
    data: { [key: string]: any };
  }) {
    return this.openModalWindowCapture({
      modalTitle: 'Student Form',
      formType: 'student',
      data: e.data,
      action: e.action,
      loadForms: true,
    });
  }
  parentFormEvtHandler(e: {
    action: 'add' | 'update' | 'delete';
    data: { [key: string]: any };
  }) {
    if (e.action === 'delete') {
      return this.handleParentFormData({ data: e.data, action: e.action });
    }
    return this.openModalWindowCapture({
      modalTitle: 'ParentForm',
      formType: 'parent',
      data: e.data,
      action: e.action,
      loadForms: true,
    });
  }

  sibilingFormEvtHandler(e: {
    action: 'add' | 'update' | 'delete';
    data: { [key: string]: any };
  }) {
    if (e.action === 'delete') {
      return this.handleSibilingFormData({ data: e.data, action: e.action });
    }
    return this.openModalWindowCapture({
      modalTitle: 'SibilingForm',
      formType: 'sibiling',
      data: e.data,
      action: e.action,
      loadForms: true,
    });
  }
  openModalWindowCapture(data: IModalWindowConf) {
    const dialogRef = this.dialog.open(ConfiguredModalComponent, {
      width: '75vw',
      data: {
        modalTitle: data.modalTitle,
        formType: data.formType,
        data: data.data,
        loadForms: true,
        action: data.action,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        switch (data?.formType) {
          case 'parent':
            this.handleParentFormData(data);
            break;
          case 'sibiling':
            this.handleSibilingFormData(data);
            break;
          case 'student':
            this.handleStudentFormData(data);
            break;
          default:
            break;
        }
      });
  }

  handleStudentFormData(data: any) {
    console.log(data);
    let studentDetails = data?.data;

    if (data.action === 'update')
      this.store.dispatch(
        StudentAction.updateStudentDetails({ data: studentDetails })
      );
    if (data.action === 'add')
      this.store.dispatch(
        StudentAction.addStudentDetails({ data: studentDetails })
      );
    if (data.action === 'delete')
      this.store.dispatch(
        StudentAction.deleteStudentDetails({ data: studentDetails })
      );

    setTimeout(() => {
      this.loadSingleStudents();
    }, 500);
  }
  handleSibilingFormData(data: any) {
    let sibilingDetails = data?.data;

    if (data.action === 'update')
      this.store.dispatch(
        SibilingActions.updateSibiling({ data: sibilingDetails })
      );
    if (data.action === 'add')
      this.store.dispatch(
        SibilingActions.addSibiling({ data: sibilingDetails })
      );
    if (data.action === 'delete')
      this.store.dispatch(
        SibilingActions.deleteSibiling({ data: sibilingDetails })
      );

    setTimeout(() => {
      this.loadSingleStudentsSibilings();
    }, 500);
  }

  handleParentFormData(data: any) {
    let { address_details } = data?.data;
    let parentDetails = data?.data
      ? Object.fromEntries(
          Object.entries(data.data).filter(([k, v]) => {
            if (k !== 'address_details') return [k, v];
            return;
          })
        )
      : {};

    if (data.action === 'update') {
      if (parentDetails?.['ID'])
        this.store.dispatch(
          ParentActions.updateParentDetails({ data: parentDetails })
        );
      if (address_details?.ID) {
        this.store.dispatch(
          AddressActions.updateAddressDetails({ data: address_details })
        );
      } else if (address_details?.ID === null) {
        this.store.dispatch(
          AddressActions.addAddressDetails({ data: address_details })
        );
      }
    }

    // if (
    //   data.action === 'update' &&
    //   parentDetails?.['ID'] &&
    //   address_details?.ID
    // ) {
    //   this.store.dispatch(
    //     ParentActions.updateParentDetails({ data: parentDetails })
    //   );
    //   this.store.dispatch(
    //     AddressActions.updateAddressDetails({ data: address_details })
    //   );
    // }

    if (data.action === 'delete') {
      this.store.dispatch(
        ParentActions.deleteParentDetails({ data: parentDetails })
      );
    }
    if (data.action === 'add') {
      this.store.dispatch(
        ParentActions.addParentDetails({ data: parentDetails })
      );
      this.store.dispatch(
        AddressActions.addAddressDetails({
          data: {
            ...address_details,
            ...{ PRNT_ADRS_CD: parentDetails['PRNT_CD'] },
          },
        })
      );
    }
    setTimeout(() => {
      this.loadSingleStudentsParentAddressDetails();
    }, 500);
  }
}
