import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeesManagementApiService } from '@shared/services/api/feesManagementApi/feesmanagement-api.service';
import { StudentdetailsService } from '@shared/services/api/studentDetailsApi/studentdetails.service';

@Component({
  selector: 'app-student-invoice',
  templateUrl: './student-invoice.component.html',
  styleUrls: ['./student-invoice.component.scss']
})
export class StudentPaymentsInfoComponent implements OnInit {
  feesPayForm: any;
  submitted = false;
  studentID: any;

  feesStrDetails = [
    {
      description: 'Meterial fees',
      ammount: 20000
    },
    {
      description: 'Term1 fees',
      ammount: 20000
    },
    {
      description: 'Term2 fees',
      ammount: 20000
    },
    {
      description: 'Transport fees',
      ammount: 20000
    },
    {
      description: 'Term3 fees',
      ammount: 20000
    },

  ];
  studentData: any = {}
  searchText = '';
  classWiseFeesStruct: any = {}
  private routeSub: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    public api: FeesManagementApiService,
    private _location: Location,
    private studentApi: StudentdetailsService) { }

  ngOnInit(): void {
    this.studentID = this.route.snapshot.paramMap.get('id');
    this.loadFeesForm()
    this.api.getSingleStudentFeesDetails(this.studentID).subscribe((studentData: any) => {
      if (studentData) {
        this.studentData = studentData && studentData.length > 0 ? studentData[0] : {}
        this.api.getAllClassFeesStructure().subscribe((data) => {
          if (data && data.length > 0) {
            data.forEach((item: any, idx: any) => {
              if (item.CLASS_ID == this.studentData.STUD_CLASS) {
                this.classWiseFeesStruct = item
              }
            })
          }

        })
      }
    })
  }

  back() {
    this._location.back();
  }

  loadFeesForm() {
    this.feesPayForm = this.fb.group({
      deductionAmt: [''],
      deductionCmts: [''],
      feesAmt: ['', Validators.required],
      feesDiscount: [''],
      feesNotes: ['', Validators.required],
      miscellaneousAmt: [''],
      miscellaneousCmts: [''],
    })
  }
  get f() { return this.feesPayForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.feesPayForm.valid) {
      let obj = {
        ADMN_NO: this.studentID,
        FEES_AMOUNT: this.feesPayForm.feesAmt,
        FEES_DISCOUNT: this.feesPayForm.feesDiscount,
        FEES_NOTES: this.feesPayForm.feesNotes,
        FEES_DED: this.feesPayForm.deductionAmt,
        FEES_DED_CMNT: this.feesPayForm.deductionCmts,
        FEES_ADDTION: this.feesPayForm.miscellaneousAmt,
        FEES_ADDTION_CMNT: this.feesPayForm.miscellaneousCmts
      }
      this.api.payFees(obj).subscribe((data) => {
        console.log(data)
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data))
        this.router.navigate([`/pages/fees-management/fees-report/${this.studentID}/review`], {queryParams: {'data':JSON.stringify(this.feesPayForm.value)}, skipLocationChange: true})

      })
    } else {
      return
    }

  }



}
