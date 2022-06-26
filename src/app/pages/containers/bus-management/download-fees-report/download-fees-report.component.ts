import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FeesManagementApiService } from '@shared/services/api/feesManagementApi/feesmanagement-api.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-download-fees-report',
  templateUrl: './download-fees-report.component.html',
  styleUrls: ['./download-fees-report.component.scss']
})
export class DownloadFeesReportComponent implements OnInit {
  feesReport:any[] = []
  constructor(public router:Router, public api:FeesManagementApiService, private _location: Location) { }

  ngOnInit(): void {
    console.log('fees structure')
    this.api.feesReport().subscribe((data) => {
        // this.feesStructure = data

      if (data) {
        this.feesReport = data
      }

    })
  }

  back(){
    this._location.back();
  }


  fileName= 'fees_report.xlsx';
  
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

  
}
