import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FeesManagementApiService } from '@shared/services/api/feesManagementApi/feesmanagement-api.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-fees-structures',
  templateUrl: './fees-structures.component.html',
  styleUrls: ['./fees-structures.component.scss']
})
export class FeesStructureComponent implements OnInit {
  feesStructure:any[] = []
  constructor(public router:Router, public api:FeesManagementApiService, private _location: Location) { }

  ngOnInit(): void {
    console.log('fees structure')
    this.api.getAllClassFeesStructure().subscribe((data) => {

      if (data && data.length > 0) {
        
      console.log('-------------------------------->>> ',data)
        this.feesStructure = data
      }

    })
  }

  back(){
    this._location.back();
  }


  fileName= 'ExcelSheet.xlsx';
  
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

  
}
