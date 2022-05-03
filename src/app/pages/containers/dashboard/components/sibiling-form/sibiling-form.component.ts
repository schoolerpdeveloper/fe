import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISiblingDetails,siblingDetailsModel } from '@shared/models/siblingDeatils';

@Component({
  selector: 'app-sibiling-form',
  templateUrl: './sibiling-form.component.html',
  styleUrls: ['./sibiling-form.component.scss']
})
export class SibilingFormComponent implements OnInit {
  sibilingDetailsForm!: FormGroup;
  classStud = new Array(10)
    .fill(0)
    .map((i, ind) => ({ label: `class ${ind + 1}`, value: `${ind + 1}` }));
  gender = ['Male', 'Female', 'Other'].map((i) => ({ label: i, value: i }));
  sibling = ['Brother', 'Sister'].map((i) => ({ label: i, value: i }));


  sibilingDetailModel!: ISiblingDetails;
  constructor(private fb:FormBuilder) { 
    this.sibilingDetailModel = {...siblingDetailsModel}
  }

  ngOnInit(): void {
  }

  initStudentDetailsForm() {
    let studentDetails: ISiblingDetails = { ...this.sibilingDetailModel };
    this.sibilingDetailsForm = this.fb.group({
      // ID: ['',[Validators.required]],
      // ADMN_NO: ['',[Validators.required]],
      SBLN_RELA: ['',[Validators.required]],
      SBLN_NAME: ['',[Validators.required]],
      SBLN_DOB: ['',[Validators.required]],
      SBLN_CLASS: ['',[Validators.required]],
      SBLN_ADMN_NO: ['',[Validators.required]],
      SBLN_DISCO: ['',[Validators.required]],
      LAST_UPDT_TS: ['',[Validators.required]],
    })
  }

}
