import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import {
  ISiblingDetails,
  siblingDetailsModel,
} from '@shared/models/siblingDeatils';
import { IStudentDetails } from '@shared/models/studentDetails';
import { startWith, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sibiling-form',
  templateUrl: './sibiling-form.component.html',
  styleUrls: ['./sibiling-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[AutoUnSubscribeService]
})
export class SibilingFormComponent implements OnInit {
  sibilingDetailsForm!: FormGroup;
  @Input() _studentDetails: IStudentDetails[] = [];

  classStud = new Array(10)
    .fill(0)
    .map((i, ind) => ({ label: `class ${ind + 1}`, value: `${ind + 1}` }));
  gender = ['Male', 'Female', 'Other'].map((i,index) => ({ label: i, value: index+1 }));
  sibling = ['Brother', 'Sister'].map((i,index) => ({ label: i, value: index+1 }));
  sibilingDetailModel: ISiblingDetails = {};
  @Output() sibDetailsFormStatus = new EventEmitter<{
    [key: string]: any;
  }>();

  @Input() set sibilingDetail(value: ISiblingDetails) {
    console.log(value)
    this.sibilingDetailModel = value ? {...value} : this.sibilingDetailModel
  }
  constructor(private fb: FormBuilder,
    @Self() private destroy$: AutoUnSubscribeService) {
    this.sibilingDetailModel = { ...siblingDetailsModel };
  }

  ngOnInit(): void {
    this.initSibilingDetailsForm();
    
    this.sibilingDetailsForm.valueChanges
      .pipe(
        startWith(this.sibilingDetailModel),
        debounceTime(500),
        takeUntil(this.destroy$)
      )

      .subscribe((data) => {
        console.log(data)
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
