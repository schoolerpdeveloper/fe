import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { feesDetailModel, IFeesDeatils } from '@shared/models/feesDetails';
import { IStudentDetails } from '@shared/models/studentDetails';

@Component({
  selector: 'app-fees-form',
  templateUrl: './fees-form.component.html',
  styleUrls: ['./fees-form.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FeesFormComponent implements OnInit {
  feesFormModel: IFeesDeatils;
  feesDetailsForm!: FormGroup;
  @Input() _studentDetails: IStudentDetails[] = [];

  constructor(private fb: FormBuilder) {
    this.feesFormModel = { ...feesDetailModel };
  }

  ngOnInit(): void {
    this.initFeesForm();
  }

  initFeesForm() {
    let feesdetails: IFeesDeatils = { ...this.feesFormModel };
    this.feesDetailsForm = this.fb.group({
      ADMN_NO: [feesdetails.ADMN_NO, []],
      FEES_DATE: [feesdetails.FEES_DATE, []],
      FEES_BILL_NO: [feesdetails.FEES_BILL_NO, []],
      FEES_AMOUNT: [feesdetails.FEES_AMOUNT, []],
      FEES_BALANCE: [feesdetails.FEES_BALANCE, []],
      FEES_DISCOUNT: [feesdetails.FEES_DISCOUNT, []],
      FEES_NOTES: [feesdetails.FEES_NOTES, []],
    });
  }
  captureAdmissionNo(e: any) {
    if (e.ADMN_NO) this.feesDetailsForm.patchValue({ ADMN_NO: e.ADMN_NO });
  }
}
