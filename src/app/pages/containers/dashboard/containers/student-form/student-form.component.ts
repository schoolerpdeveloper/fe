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
  transportDetails = {};

  stepperLocalState: { label: string; valid: boolean; interacted: boolean }[] =
    [
      {
        label: 'student',
        valid: true,
        interacted: false,
      },
      {
        label: 'parent',
        valid: true,
        interacted: false,
      },
      {
        label: 'sibiling',
        valid: true,
        interacted: false,
      },
      {
        label: 'transport',
        valid: true,
        interacted: false,
      },
    ];

  routeDetails: ITransportDeatils[] = [];
  constructor(private store: Store, private destroy$: AutoUnSubscribeService,private router:Router) {}

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
    console.log(e, this.stepperLocalState[e?.previouslySelectedIndex]);
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
    this.transportDetails = {
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

    let i = 0;

    while (i < 5) {
      console.log(i);
      i++;
    }
  }
  backToDashboard(){
    this.router.navigate([
      RouterEnum.CONTAINER,
      RouterEnum.DASHBOARD,
      RouterEnum.STUDENT_MANAGEMENT
    ])
  }
}
