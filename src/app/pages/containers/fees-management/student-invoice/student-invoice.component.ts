import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    
    // this.api.getSingleStudentFeesDetails(this.studentID).subscribe((studentData: any) => {
    //   if (studentData) {
    //     this.studentData = studentData && studentData.length > 0 ? studentData[0] : {}
    //     // this.api.getAllClassFeesStructure().subscribe((data) => {
    //     //   if (data && data.length > 0) {
    //     //     data.forEach((item: any, idx: any) => {
    //     //       if (item.CLASS_ID == this.studentData.STUD_CLASS) {
    //     //         this.classWiseFeesStruct = item
    //     //       }
    //     //     })
    //     //   }

    //     // })
    //   }
    // })
    this.api.getSingleStudentDetailsAndFeesStruct(this.studentID).subscribe((studentData: any) => {
      if (studentData) {
        console.log('newData', studentData)
        this.studentData = studentData && studentData.length > 0 ? studentData[0] : {}
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
      // otherCharges: this.fb.array([])
    })
  }
  get f() { return this.feesPayForm.controls; }
  // get t() { return (this.feesPayForm.get('tickets') as FormArray).controls; }

  onChangeTickets(e: any) {
    const field = e.target.value || 0;

    const add = this.feesPayForm.get('otherCharges') as FormArray;
    add.push(this.fb.group({
      [field]: [],
      // fees: []
    }))

    console.log(this.feesPayForm.value)
    // if (this.t.length < numberOfTickets) {
    //     for (let i = this.t.length; i < numberOfTickets; i++) {
    //         this.t.push(this.fb.group({
    //             name: ['', Validators.required],
    //             email: ['', [Validators.required, Validators.email]]
    //         }));
    //     }
    // } else {
    //     for (let i = this.t.length; i >= numberOfTickets; i--) {
    //         this.t.removeAt(i);
    //     }
    // }
  }

  deleteAddressGroup(index: number) {
    const add = this.feesPayForm.get('tickets') as FormArray;
    add.removeAt(index)
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.feesPayForm.valid) {
      let obj = {
        ADMN_NO: this.studentID,
        FEES_AMOUNT: Number(this.feesPayForm.value.feesAmt),
        FEES_DISCOUNT: Number(this.feesPayForm.value.feesDiscount),
        FEES_NOTES: this.feesPayForm.value.feesNotes,
        FEES_DED: Number(this.feesPayForm.value.deductionAmt),
        FEES_DED_CMNT: this.feesPayForm.value.deductionCmts,
        FEES_ADDTION: Number(this.feesPayForm.value.miscellaneousAmt),
        FEES_ADDTION_CMNT: this.feesPayForm.value.miscellaneousCmts
      }

      console.log(obj)
      this.router.navigate([`/pages/fees-management/fees-report/${this.studentID}/review`], { queryParams: { 'data': JSON.stringify(obj) }, skipLocationChange: true })

      // this.api.payFees(obj).subscribe((data) => {
      //   console.log(data)
      //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(data))
      //   this.router.navigate([`/pages/fees-management/fees-report/${this.studentID}/review`], {queryParams: {'data':JSON.stringify(this.feesPayForm.value)}, skipLocationChange: true})

      // })
    } else {
      return
    }

  }



}
