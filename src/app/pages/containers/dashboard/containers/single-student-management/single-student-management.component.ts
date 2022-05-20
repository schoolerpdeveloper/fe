import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { Store } from '@ngrx/store';
import { IParentDetails } from '@shared/models/parentDetails';
import { ISiblingDetails } from '@shared/models/siblingDeatils';
import { IStudentDetails } from '@shared/models/studentDetails';
import { Observable } from 'rxjs';
import { tap, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { ParentActions } from 'src/app/pages/pages_store/actions/parent.actions';
import { SibilingActions } from 'src/app/pages/pages_store/actions/sibiling.actions';
import * as StudentAction from 'src/app/pages/pages_store/actions/student.actions';
import { selectParentDetails, selectSingleParent } from 'src/app/pages/pages_store/selectors/parent.selectors';
import {
  selectSingleStudents,
  selectStudentLists,
} from 'src/app/pages/pages_store/selectors/student.selectors';

@Component({
  selector: 'app-single-student-management',
  templateUrl: './single-student-management.component.html',
  styleUrls: ['./single-student-management.component.scss'],
  providers: [AutoUnSubscribeService],
})
export class SingleStudentManagementComponent implements OnInit {
  admissionNo!: string | number;
  studentlist!: IStudentDetails;
  parentDetails: IParentDetails[] = [];
  siblingdetails: ISiblingDetails[] = [];

  constructor(
    private store: Store,
    private actRoute: ActivatedRoute,
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
      .select(selectParentDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.parentDetails = [...d];
      });
    this.loadSingleStudents();
    this.loadSingleStudentsSibilings();
    this.loadSingleStudentsParents();
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
  
}
