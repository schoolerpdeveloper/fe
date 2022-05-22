import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { Store } from '@ngrx/store';
import { IModalWindowConf } from '@shared/models/modal.win.interface';
import { IParentDetails } from '@shared/models/parentDetails';
import { IParentDetailsAddress } from '@shared/models/parentDetailsAdress';
import { ISiblingDetails } from '@shared/models/siblingDeatils';
import { IStudentDetails } from '@shared/models/studentDetails';
import { IStudentList } from '@shared/models/studentDetails/student-details.interface';
import {
  takeUntil,
  filter,
  map,
} from 'rxjs/operators';
import { RouterEnum } from 'src/app/enums/router.enum';
import { AddressActions } from 'src/app/pages/pages_store/actions/address.actions';
import { ParentActions } from 'src/app/pages/pages_store/actions/parent.actions';
import { SibilingActions } from 'src/app/pages/pages_store/actions/sibiling.actions';
import * as StudentAction from 'src/app/pages/pages_store/actions/student.actions';
import { TransportActions } from 'src/app/pages/pages_store/actions/transport.actions';
import { selectSingleParentAddress } from 'src/app/pages/pages_store/selectors/address.selectors';
import {
  parentDataLoading,
  selectParentDetails,
} from 'src/app/pages/pages_store/selectors/parent.selectors';
import {
  selectSibilingDetails,
  sibilingDataLoading,
} from 'src/app/pages/pages_store/selectors/sibiling.selectors';
import {
  selectSingleStudents,
  selectStudentLists,
  studentDataLoading,
} from 'src/app/pages/pages_store/selectors/student.selectors';
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
  studentlist!: IStudentDetails;
  parentdetails: IParentDetails[] = [];
  parentAddressdetails: IParentDetailsAddress[] = [];

  sibilingdetails: ISiblingDetails[] = [];

  studentLoading$ = this.store.select(studentDataLoading);
  parentLoading$ = this.store.select(parentDataLoading);
  sibLoading$ = this.store.select(sibilingDataLoading);

  selectAllStudents$ = this.store.select(selectStudentLists).pipe(
    filter((itm: any, ind: number) => ind > 1),
    map((d: IStudentList) => d.ADMN_NO)
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
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.studentlist = { ...d };
      });
    this.store
      .select(selectSingleParentAddress)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        console.log(d)
        this.parentAddressdetails = [...d];
      });
    this.store
      .select(selectParentDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.parentdetails = [...d];
      });
    this.store
      .select(selectSibilingDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.sibilingdetails = [...d];
      });
    this.initAllSingleStudentDetails()
  }
  initAllSingleStudentDetails(){
    this.loadSingleStudents();
    this.loadSingleStudentsSibilings();
    this.loadSingleStudentsParents();
    this.loadSingleStudentsParentsAddress();
  }

  loadSingleStudents() {
    this.store.dispatch(
      StudentAction.loadSingleStudents({ admissionNumber: this.admissionNo })
    );
  }

  loadSingleStudentsSibilings() {
    this.store.dispatch(
      SibilingActions.loadAdmissionBasedSibilings({
        admissionNo: this.admissionNo,
      })
    );
  }
  loadSingleStudentsParents() {
    this.store.dispatch(
      ParentActions.loadAdmissionBasedParents({ admissionNo: this.admissionNo })
    );
  }
  loadSingleStudentsParentsAddress() {
    this.store.dispatch(
      AddressActions.loadAdmissionBasedAddress({
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

  parentFormEvtHandler(e: {
    action: 'add' | 'update';
    data: {[key:string]:any};
  }) {

    switch (e.action) {
      case 'add': {
        return this.openModalWindowCapture({
          modalTitle: 'ParentForm',
          formType: 'parent',
          data: e.data,
          action:e.action,
          loadForms: true,
        });
      }
      case 'update': {
        return this.openModalWindowCapture({
          modalTitle: 'ParentForm',
          formType: 'parent',
          data: e.data,
          action:e.action,
          loadForms: true,
        });
      }
    }
  }

  openModalWindowCapture(data: IModalWindowConf) {
    const dialogRef = this.dialog.open(ConfiguredModalComponent, {
      width: '75vw',
      data: {
        modalTitle: data.modalTitle,
        formType: data.formType,
        data: data.data,
        loadForms: true,
        action:data.action
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if(data.formType === 'parent'){
          this.loadSingleStudentsParents();
          this.loadSingleStudentsParentsAddress();
        }
      });
  }
}
