import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { Store } from '@ngrx/store';
import {
  IStudentDetails,
  studentDetailsModel,
} from '@shared/models/studentDetails';
import { startWith, debounceTime, takeUntil, map, tap } from 'rxjs/operators';
import { UtilSelector } from 'src/app/pages/pages_store/selectors/util.selector';

@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AutoUnSubscribeService],
})
export class AdmissionFormComponent implements OnInit {
  studentDetailsForm!: FormGroup;
  classStud:any[] = [];

  // new Array(10)
  //   .fill(0)
  //   .map((i, ind) => ({ label: `class ${ind + 1}`, value: `${ind + 1}` }));
  gender = ['Male', 'Female', 'Other'].map((i) => ({ label: i, value: i }));
  @Output() studentDetailsFormStatus = new EventEmitter<{
    [key: string]: any;
  }>();
  studentDetailModel!: IStudentDetails;
  @Input() set studentDetails(value: IStudentDetails) {
    this.studentDetailModel = value ? { ...value } : this.studentDetailModel;
  }
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private destroy$: AutoUnSubscribeService,
    private cdr:ChangeDetectorRef
  ) {
    this.studentDetailModel = { ...studentDetailsModel };
  }

  ngOnInit(): void {
    this.initStudentDetailsForm();
    this.studentDetailsForm.valueChanges
      .pipe(
        startWith(this.studentDetailModel),
        debounceTime(500),
        takeUntil(this.destroy$)
      )

      .subscribe((data) => {
        console.log(data);
        let temp = {
          studentDetail: {
            data: data,
            valid: this.studentDetailsForm.valid,
            touched:this.studentDetailsForm.touched
          },
        };
        this.studentDetailsFormStatus.emit(temp);
      });

    this.store
      .select(UtilSelector.selectClassConfig)
      .pipe(
        takeUntil(this.destroy$),
        tap((classes) => {
          let temp = classes.map((i, ind) => ({ label: i.class_name, value: i.class_id }));
          this.classStud = temp;
          this.cdr.markForCheck()
          return temp;
        })
      )
      .subscribe();
  }

  initStudentDetailsForm() {
    let studentDetails: IStudentDetails = { ...this.studentDetailModel };
    this.studentDetailsForm = this.fb.group({
      ADMIN_DATE: [studentDetails.ADMIN_DATE, [Validators.required]],
      ADMN_NO: [studentDetails.ADMN_NO, [Validators.required]],
      STUD_FIRST_NAME: [studentDetails.STUD_FIRST_NAME, [Validators.required]],
      STUD_CLASS: [studentDetails.STUD_CLASS, []],
      STUD_LAST_NAME: [studentDetails.STUD_LAST_NAME, []],
      STUD_FATH_NAME: [studentDetails.STUD_FATH_NAME, [Validators.required]],
      STUD_MTHR_NAME: [studentDetails.STUD_MTHR_NAME, [Validators.required]],
      STUD_GNDR: [studentDetails.STUD_GNDR, [Validators.required]],
      STUD_DOB: [studentDetails.STUD_DOB, [Validators.required]],
      STUD_CASTE: [studentDetails.STUD_CASTE, []],
      STUD_SUB_CASTE: [studentDetails.STUD_SUB_CASTE, []],
      STUD_CMTY: [studentDetails.STUD_CMTY, []],
      STUD_RLIG: [studentDetails.STUD_RLIG, []],
      STUD_NTLY: [studentDetails.STUD_NTLY, []],
      STUD_MTHR_TNGE: [studentDetails.STUD_MTHR_TNGE, []],
      STUD_LNG_KNWN: [studentDetails.STUD_LNG_KNWN, []],
      STUD_BLD_GRUP: [studentDetails.STUD_BLD_GRUP, []],
      STUD_AHAR_NO: [studentDetails.STUD_AHAR_NO, [Validators.required]],
      STUD_EMIS_NO: [studentDetails.STUD_EMIS_NO, []],
      STUD_PREV_SCHL: [studentDetails.STUD_PREV_SCHL, []],
      STUD_DISCOUNT: [studentDetails.STUD_DISCOUNT, []],
      STUD_IS_ACTIVE: [studentDetails.IS_ACTIVE, []],
    });
  }
}
