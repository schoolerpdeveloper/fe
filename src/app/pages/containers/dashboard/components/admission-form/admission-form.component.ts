import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IStudentDetails,
  studentDetailsModel,
} from '@shared/models/studentDetails';

@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.scss'],
})
export class AdmissionFormComponent implements OnInit {
  studentDetailsForm!: FormGroup;
  classStud = new Array(10).fill(0).map((i,ind)=>({label:`class ${ind+1}`,value:`${ind+1}`}));
  gender = ['Male','Female','Other'].map(i=>({label:i,value:i}))

  studentDetailModel!:IStudentDetails;
  constructor(private fb: FormBuilder) {
    this.studentDetailModel = {...studentDetailsModel,...{STUD_CLASS:'5',STUD_FIRST_NAME:'Srini',STUD_LAST_NAME:'Ragu'}};
  }

  ngOnInit(): void {
    this.initStudentDetailsForm();
  }

  initStudentDetailsForm() {
    let studentDetails: IStudentDetails = { ...this.studentDetailModel };
    
    this.studentDetailsForm = this.fb.group({
      ADMIN_DATE: [studentDetails.ADMIN_DATE, [Validators.required]],
      ADMN_NO: [studentDetails.ADMN_NO, [Validators.required]],
      STUD_FIRST_NAME: [studentDetails.STUD_FIRST_NAME, [Validators.required]],
      STUD_CLASS: [studentDetails.STUD_CLASS, [Validators.required]],
      STUD_LAST_NAME: [studentDetails.STUD_LAST_NAME, [Validators.required]],
      STUD_FATH_NAME: [studentDetails.STUD_FATH_NAME, [Validators.required]],
      STUD_MTHR_NAME: [studentDetails.STUD_MTHR_NAME, [Validators.required]],
      STUD_GNDR: [studentDetails.STUD_GNDR, [Validators.required]],
      STUD_DOB: [studentDetails.STUD_DOB, [Validators.required]],
      STUD_CASTE: [studentDetails.STUD_CASTE, [Validators.required]],
      STUD_SUB_CASTE: [studentDetails.STUD_SUB_CASTE, [Validators.required]],
      STUD_CMTY: [studentDetails.STUD_CMTY, [Validators.required]],
      STUD_RLIG: [studentDetails.STUD_RLIG, [Validators.required]],
      STUD_NTLY: [studentDetails.STUD_NTLY, [Validators.required]],
      STUD_MTHR_TNGE: [studentDetails.STUD_MTHR_TNGE, [Validators.required]],
      STUD_LNG_KNWN: [studentDetails.STUD_LNG_KNWN, [Validators.required]],
      STUD_BLD_GRUP: [studentDetails.STUD_BLD_GRUP, [Validators.required]],
      STUD_AHAR_NO: [studentDetails.STUD_AHAR_NO, [Validators.required]],
      STUD_EMIS_NO:  [studentDetails.STUD_EMIS_NO, [Validators.required]],
      STUD_PREV_SCHL: [studentDetails.STUD_PREV_SCHL, [Validators.required]],
      STUD_DISCOUNT: [studentDetails.STUD_DISCOUNT, [Validators.required]],
      STUD_IS_ACTIVE: [studentDetails.STUD_DISCOUNT, [Validators.required]],
      // CRET_TS: null,
      // LAST_UPDT_TS: null,
    });
  }
}
