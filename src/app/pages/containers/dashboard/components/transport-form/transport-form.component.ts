import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IStudentDetails } from '@shared/models/studentDetails';
import {
  ITransportDeatils,
  transportDetailModel,
} from '@shared/models/transportDetails';

@Component({
  selector: 'app-transport-form',
  templateUrl: './transport-form.component.html',
  styleUrls: ['./transport-form.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TransportFormComponent implements OnInit {
  transportDetailsForm!: FormGroup;
  @Input() _studentDetails: IStudentDetails[] = [];
  classStud = new Array(10)
    .fill(0)
    .map((i, ind) => ({ label: `class ${ind + 1}`, value: `${ind + 1}` }));
  gender = ['Male', 'Female', 'Other'].map((i) => ({ label: i, value: i }));
  sibling = ['Brother', 'Sister'].map((i) => ({ label: i, value: i }));
  transportDetails!: ITransportDeatils;
  constructor(private fb: FormBuilder) {
    this.transportDetails = { ...transportDetailModel };
  }
  ngOnInit(): void {
    this.initTransportDetailsForm();
  }
  initTransportDetailsForm() {
    let transportDetails: ITransportDeatils = { ...this.transportDetails };
    this.transportDetailsForm = this.fb.group({
      ADMN_NO: [transportDetails.ADMN_NO, []],
      BUS_RUTE_CD: [transportDetails.BUS_RUTE_CD, []],
      BUS_RUTE_NO: [transportDetails.BUS_RUTE_NO, []],
      BUS_RUTE_DRIVER_NAME: [transportDetails.BUS_RUTE_DRIVER_NAME, []],
      BUS_RUTE_DRIVER_NO: [transportDetails.BUS_RUTE_DRIVER_NO, []],
      BUS_RUTE_INCH_NAME: [transportDetails.BUS_RUTE_INCH_NAME, []],
      BUS_RUTE_INCH_NO: [transportDetails.BUS_RUTE_INCH_NO, []],
      BUS_RUTE_INS_DTL: [transportDetails.BUS_RUTE_INS_DTL, []],
    });
  }
  captureAdmissionNo(e: any) {
    if (e.ADMN_NO) this.transportDetailsForm.patchValue({ ADMN_NO: e.ADMN_NO });
  }
}
