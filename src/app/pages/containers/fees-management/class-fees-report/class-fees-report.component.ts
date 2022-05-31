import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeesManagementApiService } from '@shared/services/api/feesManagementApi/feesmanagement-api.service';

@Component({
  selector: 'app-class-fees-report',
  templateUrl: './class-fees-report.component.html',
  styleUrls: ['./class-fees-report.component.scss']
})
export class ClassWiseFeesReportsComponent implements OnInit {
  searchText = '';
  classWiseFees:any= []
  constructor(public router:Router, public api:FeesManagementApiService, private _location: Location) { }

  ngOnInit(): void {
    this.api.getAllClassWiseFees().subscribe((data)=>{
      console.log('data', data)
      this.classWiseFees = data
    })
  }

  back(){
    this._location.back();
  }

}
