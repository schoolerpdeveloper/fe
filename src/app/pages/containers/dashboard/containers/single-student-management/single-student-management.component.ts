import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { Store } from '@ngrx/store';
import { tap, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { loadAllDetailsRelatedToStudent } from 'src/app/pages/pages_store/actions/student.actions';

@Component({
  selector: 'app-single-student-management',
  templateUrl: './single-student-management.component.html',
  styleUrls: ['./single-student-management.component.scss'],
  providers: [AutoUnSubscribeService],
})
export class SingleStudentManagementComponent implements OnInit {
  admissionNo!: string | number;
  constructor(
    private store: Store,
    private actRoute: ActivatedRoute,
    private destroy$: AutoUnSubscribeService
  ) {
    let adNo = this.actRoute.snapshot.params;
    this.admissionNo = (adNo?.['admissionNo']) as string|number;

  }

  ngOnInit(): void {
    this.store.dispatch(loadAllDetailsRelatedToStudent({admissioNo:this.admissionNo}))
  }
}
