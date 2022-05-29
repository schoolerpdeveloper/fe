import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { Store } from '@ngrx/store';
import {
  IParentDetails,
  parentDetailsModel,
} from '@shared/models/parentDetails';
import { ISiblingDetails } from '@shared/models/siblingDeatils';
import { IStudentDetails } from '@shared/models/studentDetails';
import { ITransportDeatils } from '@shared/models/transportDetails';
import { takeUntil } from 'rxjs';
import { RouterEnum } from 'src/app/enums/router.enum';
import { TransportActions } from 'src/app/pages/pages_store/actions/transport.actions';
import { selectAllStudents } from 'src/app/pages/pages_store/selectors/student.selectors';
import { TransportSelector } from 'src/app/pages/pages_store/selectors/transport.selector';
import * as StudentAction from 'src/app/pages/pages_store/actions/student.actions';
import { ParentActions } from 'src/app/pages/pages_store/actions/parent.actions';
import { SibilingActions } from 'src/app/pages/pages_store/actions/sibiling.actions';
import { AddressActions } from 'src/app/pages/pages_store/actions/address.actions';
import { Router } from '@angular/router';
import { RouterEnum } from 'src/app/enums/router.enum';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
  providers: [AutoUnSubscribeService],
})
export class StudentFormComponent {
  loadStudentDetails: IStudentDetails[] = [];
  studentDetails: IStudentDetails = {};
  sibDetails: ISiblingDetails = {};

  parentDetails: IParentDetails = {};
  addressDetails = {};
  transportDetail: any = {};

  stepperLocalState: {
    label: string;
    valid: boolean;
    interacted: boolean;
    isSubmitted: boolean;
  }[] = [
    {
      label: 'student',
      valid: true,
      interacted: false,
      isSubmitted: false,
    },
    {
      label: 'parent',
      valid: true,
      interacted: false,
      isSubmitted: false,
    },
    {
      label: 'sibiling',
      valid: true,
      interacted: false,
      isSubmitted: false,
    },
    {
      label: 'transport',
      valid: true,
      interacted: false,
      isSubmitted: false,
    },
  ];

  routeDetails: ITransportDeatils[] = [];
  constructor(
    private store: Store,
    private destroy$: AutoUnSubscribeService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.loadStudentDetails
    this.store
      .select(TransportSelector.selectBusRouteCodeDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.routeDetails = d;
      });

    this.store
      .select(selectAllStudents)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.loadStudentDetails = [...d];
      });

    this.store.dispatch(TransportActions.loadAllBusRoute());
  }

  selected(e: any) {
    const currentForm: any = this.stepperLocalState[e?.previouslySelectedIndex];
    if (
      currentForm.valid &&
      !currentForm.isSubmitted &&
      this.studentDetails.ADMN_NO
    ) {
      switch (currentForm?.label) {
        case 'student':
          {
            let data = {
              ...this.studentDetails,
              ...{ SCHOOL_ID: 2, ACADEMIC_ID: 20 },
            };
            this.store.dispatch(StudentAction.addStudentDetails({ data }));
            this.stepperLocalState[e?.previouslySelectedIndex]['isSubmitted'] =
              true;
          }
          break;
        case 'parent':
          {
            this.store.dispatch(
              ParentActions.addParentDetails({ data: this.parentDetails })
            );
            this.store.dispatch(
              AddressActions.addAddressDetails({ data: this.addressDetails })
            );
            this.stepperLocalState[e?.previouslySelectedIndex]['isSubmitted'] =
              true;
          }
          break;
        case 'sibiling':
          {
            this.store.dispatch(
              SibilingActions.addSibiling({ data: this.sibDetails })
            );
            this.stepperLocalState[e?.previouslySelectedIndex]['isSubmitted'] =
              true;
          }
          break;
        case 'transport':
          {
            this.store.dispatch(
              StudentAction.updateStudentDetails({ data: this.transportDetail })
            );
            this.stepperLocalState[e?.previouslySelectedIndex]['isSubmitted'] =
              true;
          }
          break;
        default:
          break;
      }
    }
  }
  interactedStreamStepper(e: any) {
    let flags = e?._stepper?.steps?._results
      ? Array.from(e?._stepper?.steps?._results).map((i: any) => i.interacted)
      : [];
    if (flags.length) {
      this.stepperLocalState = this.stepperLocalState.map((i, index) => {
        i.interacted = flags[index];
        return i;
      });
    }
  }
  parentDetailsFormStatusHandle(e: any) {
    this.parentDetails = {
      ...e?.parentDetails.data,
      ADMN_NO: this.studentDetails.ADMN_NO,
    };

    this.stepperLocalState = this.stepperLocalState.map((i) => {
      if (i.label === 'parent') i.valid = e.parentDetails.valid;
      console.log(i);
      return i;
    });
  }
  parentAddressFormStatusHandle(e: any) {
    this.addressDetails = {
      ...e?.addressForm.data,
      ADMN_NO: this.studentDetails.ADMN_NO,
      PRNT_ADRS_CD: this.parentDetails.PRNT_CD,
    };
    this.stepperLocalState = this.stepperLocalState.map((i) => {
      if (i.label === 'parent') i.valid = e.addressForm.valid;
      return i;
    });
  }
  sibDetailsFormStatusHandle(e: any) {
    this.sibDetails = {
      ...e?.sibilingDetails.data,
      ADMN_NO: this.studentDetails.ADMN_NO,
    };
    this.stepperLocalState = this.stepperLocalState.map((i) => {
      if (i.label === 'sibiling') i.valid = e.sibilingDetails.valid;
      return i;
    });
  }
  busDetailsFormStatusHandle(e: any) {
    this.transportDetail = {
      ...e?.transportDetail.data,
      ADMN_NO: this.studentDetails.ADMN_NO,
    };
    this.stepperLocalState = this.stepperLocalState.map((i) => {
      if (i.label === 'transport') i.valid = e.transportDetail.valid;
      return i;
    });
  }
  studentDetailsFormStatusHandle(e: any) {
    this.studentDetails = { ...e?.studentDetail.data };

    this.stepperLocalState = this.stepperLocalState.map((i) => {
      if (i.label === 'student') i.valid = e.studentDetail.valid;
      return i;
    });
  }
  navigateToStudentList() {
    this.router.navigate([
      RouterEnum.CONTAINER,
      RouterEnum.DASHBOARD,
      RouterEnum.STUDENT_MANAGEMENT,
    ]);
  }
  backToDashboard(){
    this.router.navigate([
      RouterEnum.CONTAINER,
      RouterEnum.DASHBOARD,
      RouterEnum.STUDENT_MANAGEMENT
    ])
  }
}
