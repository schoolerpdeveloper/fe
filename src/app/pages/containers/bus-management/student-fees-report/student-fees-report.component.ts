import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FeesManagementApiService } from '@shared/services/api/feesManagementApi/feesmanagement-api.service';

@Component({
  selector: 'app-student-fees-report',
  templateUrl: './student-fees-report.component.html',
  styleUrls: ['./student-fees-report.component.scss']
})
export class FeesReportTableComponent implements OnInit {
  searchText = '';
  studentWiseFeesReport:any= []
  constructor(public router:Router, public api:FeesManagementApiService, private _location: Location) { }

  ngOnInit(): void {
    this.api.allStudentsFeesDetails().subscribe((data)=>{
      console.log('data', data)
      this.studentWiseFeesReport = data
    })
  }

  back(){
    this._location.back();
  }
  viewInvoice(id:number){
    this.router.navigate([`/pages/fees-management/fees-report/${id}`])
  }
  feesHistory(id:number){
    this.router.navigate([`/pages/fees-management/fees-history/${id}`])
  }
}
