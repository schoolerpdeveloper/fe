import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  IParentDetails,
  parentDetailsModel,
} from '@shared/models/parentDetails';
import { IStudentDetails } from '@shared/models/studentDetails';
import { tap } from 'rxjs';
import { selectAllStudents } from 'src/app/pages/pages_store/selectors/pages.selectors';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss'],
})
export class ParentFormComponent implements OnInit {
  parentDetailsForm!: FormGroup;
  parentAddressForm!: FormGroup;

  @Input() _studentDetails: IStudentDetails[] = [];
  parentDetailModel: IParentDetails = {};

  occupation = [
    'engineer',
    'doctor',
    'plumber',
    'electrician',
    'business',
    'others',
  ].map((i) => ({ label: i, value: i }));

  constructor(private fb: FormBuilder) {
    this.parentDetailModel = { ...parentDetailsModel };
  }

  ngOnInit(): void {
    this.initParentAddressForm();
    this.initParentForm();
  }

  initParentForm() {
    this.parentDetailsForm = this.fb.group({
      ADMN_NO: ['', []],
      PRNT_CD: ['', []],
      PRNT_EDUC: ['', []],
      PRNT_OCCU: ['', []],
      PRNT_AADH_NO: ['', [Validators.required]],
      PRNT_PHNE_NO: ['', [Validators.required]],
      PRNT_EMAIL_ID: ['', []],
    });
  }
  initParentAddressForm() {
    this.parentAddressForm = this.fb.group({
      ADMN_NO: ['', []],
      PRNT_ADRS_CD: ['', []],
      PRNT_ADRS_ADD1: ['', []],
      PRNT_ADRS_ADD2: ['', []],
      PRNT_ADRS_ADD3: ['', []],
      PRNT_ADRS_ADD4: ['', []],
      PRNT_ADRS_ADD5: ['', []],
      PRNT_ADRS_DIST: ['', []],
      PRNT_ADRS_PSTL_CD: ['', [Validators.required]],
  
    });
  }
  captureAdmissionNo(e: any) {
    if (e.ADMN_NO) this.parentDetailsForm.patchValue({ ADMN_NO: e.ADMN_NO });
  }
}
