import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeesManagementApiService } from '@shared/services/api/feesManagementApi/feesmanagement-api.service';
import { StudentdetailsService } from '@shared/services/api/studentDetailsApi/studentdetails.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invoice-review',
  templateUrl: './invoice-review.component.html',
  styleUrls: ['./invoice-review.component.scss']
})
export class InvoiceReviewComponent implements OnInit {
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
  paramsSubscription :any;

  studentData: any = {}
  feesHistory: any = []
  searchText = '';
  classWiseFeesStruct: any = {}
  formData:any;
  formDataKeys:any
  private routeSub: any;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public api: FeesManagementApiService,
    private _location: Location,
    private studentApi: StudentdetailsService) { }

  ngOnInit(): void {
    this.studentID = this.route.snapshot.paramMap.get('id');
   this.paramsSubscription = this.route.queryParams.subscribe(params =>{ this.formData= JSON.parse(params['data']); this.formDataKeys = Object.keys(this.formData)});
    this.singleStudentFeesDetails()
    console.log('------------------->>>>>   ',this.formData)
  }

  ngOnDestroy() {
    console.log("Component will be destroyed");
    this.paramsSubscription.unsubscribe();
  }

  back() {
    this._location.back();
  }

  singleStudentFeesDetails() {
    this.api.getSingleStudentFeesDetails(this.studentID).subscribe((studentData: any) => {
      if (studentData) {
        this.studentData = studentData && studentData.length > 0 ? studentData[0] : {}
        this.getFeesPayHistory()
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
  getFeesPayHistory() {
    console.log('started')
    let params = {
      ADMN_NO:this.studentData.ADMN_NO
    }
    this.api.feesPayHistory(this.studentID).subscribe((feesHistory: any) => {
      if (feesHistory) {
        this.feesHistory = feesHistory;
      }
    })
  }


  submit(){
    this.api.payFees(this.formData).subscribe((data) => {
      console.log(data)
      this.router.navigate([`/pages/fees-management/student-report`])

    })
  }


}
