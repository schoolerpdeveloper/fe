import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { Store } from '@ngrx/store';
import {
  ISiblingDetails,
  siblingDetailsModel,
} from '@shared/models/siblingDeatils';
import { IStudentDetails } from '@shared/models/studentDetails';
import {
  startWith,
  debounceTime,
  takeUntil,
  map,
  take,
  tap,
  switchMap,
  filter,
  distinctUntilChanged,
} from 'rxjs/operators';

import { loadStudents } from 'src/app/pages/pages_store/actions/student.actions';
import { selectAllStudents } from 'src/app/pages/pages_store/selectors/student.selectors';
import { UtilSelector } from 'src/app/pages/pages_store/selectors/util.selector';

@Component({
  selector: 'app-sibiling-form',
  templateUrl: './sibiling-form.component.html',
  styleUrls: ['./sibiling-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AutoUnSubscribeService],
})
export class SibilingFormComponent implements OnInit {
  sibilingDetailsForm!: FormGroup;
  @Input() _studentDetails: IStudentDetails[] = [];
  studentDetailsAutosuggestion: any = [];
  @Input() set admissionNo(value: string | number | undefined | null) {
    if (value) {
      this.sibilingDetailsForm.patchValue({ ADMN_NO: value });
    }
    this.cdr.markForCheck();
  }
  classStud: any[] = [];
  //   .fill(0)
  //   .map((i, ind) => ({ label: `class ${ind + 1}`, value: `${ind + 1}` }));
  gender = ['Male', 'Female', 'Other'].map((i, index) => ({
    label: i,
    value: index + 1,
  }));
  sibling = ['Brother', 'Sister'].map((i, index) => ({
    label: i,
    value: index + 1,
  }));
  sibilingDetailModel: ISiblingDetails = {};
  @Output() sibDetailsFormStatus = new EventEmitter<{
    [key: string]: any;
  }>();

  @Input() set sibilingDetail(value: ISiblingDetails) {
    this.sibilingDetailModel = value ? { ...value } : this.sibilingDetailModel;
  }
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private store: Store,
    @Self() private destroy$: AutoUnSubscribeService
  ) {
    this.sibilingDetailModel = { ...siblingDetailsModel };
  }

  ngOnInit(): void {
    this.initSibilingDetailsForm();
    this.store
      .select(UtilSelector.selectClassConfig)
      .pipe(
        takeUntil(this.destroy$),
        tap((classes) => {
          let temp = classes.map((i, ind) => ({
            label: i.class_name,
            value: i.class_id,
          }));
          this.classStud = temp;
          this.cdr.markForCheck();
          return temp;
        })
      )
      .subscribe();
    this.sibilingDetailsForm
      .get('SBLN_ADMN_NO')
      ?.valueChanges.pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        switchMap((d) =>
          this.store.select(selectAllStudents).pipe(
            map((students: IStudentDetails[]) => {
              this.studentDetailsAutosuggestion = [];
              return d
                ? students.find((i: IStudentDetails) => {
                    if (i.ADMN_NO?.toLowerCase().includes(d.toLowerCase()))
                      this.studentDetailsAutosuggestion.concat(i.ADMN_NO);
                    if (i.ADMN_NO?.toLowerCase() === d.toLowerCase()) return i;
                    return;
                  })
                : null;
            })
          )
        )
      )
      .subscribe((d) => {
        if (d) {
          this.sibilingDetailsForm.patchValue({
            SBLN_NAME: d?.STUD_FIRST_NAME ? d?.STUD_FIRST_NAME : '',
            SBLN_RELA: d?.STUD_GNDR
              ? d?.STUD_GNDR?.toLowerCase() === 'female'
                ? 2
                : 1
              : '',
            SBLN_DOB: d?.STUD_DOB ? d?.STUD_DOB : '',
            SBLN_CLASS: d?.STUD_CLASS ? d?.STUD_CLASS : '',
          });
        } else {
          this.sibilingDetailsForm.patchValue({
            SBLN_NAME: '',
            SBLN_RELA: '',
            SBLN_DOB: '',
            SBLN_CLASS: '',
          });
        }
      });

    this.sibilingDetailsForm.valueChanges
      .pipe(
        startWith(this.sibilingDetailModel),
        debounceTime(500),
        takeUntil(this.destroy$)
      )

      .subscribe((data) => {
        let temp = {
          sibilingDetails: {
            data: data,
            valid: this.sibilingDetailsForm.valid,
          },
        };
        this.sibDetailsFormStatus.emit(temp);
      });
  }

  initSibilingDetailsForm() {
    let sibilingDetail: ISiblingDetails = { ...this.sibilingDetailModel };
    this.sibilingDetailsForm = this.fb.group({
      ...(sibilingDetail.ID && { ID: [sibilingDetail.ID, []] }),
      ADMN_NO: [sibilingDetail.ADMN_NO, []],
      SBLN_RELA: [sibilingDetail.SBLN_RELA, []],
      SBLN_NAME: [sibilingDetail.SBLN_NAME, []],
      SBLN_ADMN_NO: [sibilingDetail.SBLN_ADMN_NO, []],
      SBLN_DISCO: [sibilingDetail.SBLN_DISCO, []],
      SBLN_DOB: [sibilingDetail.SBLN_DOB, []],
      SBLN_CLASS: [sibilingDetail.SBLN_CLASS, []],
      SBLN_COMMENTS: [sibilingDetail.SBLN_COMMENTS, []],
    });
  }
  captureAdmissionNo(e: any) {
    if (e.ADMN_NO) this.sibilingDetailsForm.patchValue({ ADMN_NO: e.ADMN_NO });
  }
}
