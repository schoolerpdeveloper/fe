import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  Self,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import {
  IParentDetails,
  parentDetailsModel,
} from '@shared/models/parentDetails';
import {
  IParentDetailsAddress,
  parentDetailsAddressModel,
} from '@shared/models/parentDetailsAdress';
import { IStudentDetails } from '@shared/models/studentDetails';
import { combineLatest } from 'rxjs';
import { debounceTime, delay, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss'],
  viewProviders: [AutoUnSubscribeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentFormComponent implements OnInit {
  parentDetailsForm!: FormGroup;

  @Input() _studentDetails: IStudentDetails[] = [];
  parentDetailModel: IParentDetails = {};

  @Input() set parentDetail(value: IParentDetails) {
    this.parentDetailModel = value
      ? {
          ...value,
          ...(value.PRNT_OCCU
            ? { PRNT_OCCU: value.PRNT_OCCU.toLowerCase() }
            : {}),
        }
      : this.parentDetailModel;
  }

  @Input() showField: boolean = false;
  @Output() parentDetailsFormStatus = new EventEmitter<{
    [key: string]: any;
  }>();

  occupation = [
    'engineer',
    'doctor',
    'plumber',
    'electrician',
    'business',
    'teacher',
    'driver',
    'others',
  ].map((i) => ({ label: i, value: i }));
  relations = [
    { label: 'Father', value: 1 },
    { label: 'Mother', value: 2 },
    { label: 'Gaurdian', value: 3 },
  ];

  constructor(
    private fb: FormBuilder,
    @Self() private destroy$: AutoUnSubscribeService
  ) {
    this.parentDetailModel = { ...parentDetailsModel };
  }

  ngOnInit(): void {
    this.initParentForm();

    this.parentDetailsForm.valueChanges
      .pipe(
        startWith(this.parentDetailModel),
        debounceTime(500),
        takeUntil(this.destroy$)
      )

      .subscribe((data) => {
        console.log(data)
        let temp = {
          parentDetails: {
            data: data,
            valid: this.parentDetailsForm.valid,
          },
        };
        this.parentDetailsFormStatus.emit(temp);
      });
  }

  initParentForm() {
    let parentDetails = { ...this.parentDetailModel };
    this.parentDetailsForm = this.fb.group({
      ADMN_NO: [parentDetails.ADMN_NO, [Validators.required]],
      PRNT_CD: [parentDetails.PRNT_CD, [Validators.required]],
      FIRST_NAME: [parentDetails.FIRST_NAME, []],
      ...(parentDetails.ID && { ID: [parentDetails.ID, []] }),
      PRNT_EDUC: [parentDetails.PRNT_EDUC, []],
      PRNT_OCCU: [parentDetails.PRNT_OCCU, []],
      PRNT_AADH_NO: [parentDetails.PRNT_AADH_NO, [Validators.required]],
      PRNT_PHNE_NO: [parentDetails.PRNT_PHNE_NO, [Validators.required]],
      PRNT_EMAIL_ID: [parentDetails.PRNT_EMAIL_ID, []],
    });
  }

  captureAdmissionNo(e: any) {
    if (e.ADMN_NO) this.parentDetailsForm.patchValue({ ADMN_NO: e.ADMN_NO });
  }
}
