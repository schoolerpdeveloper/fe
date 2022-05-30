import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fees-reports',
  templateUrl: './fees-reports.component.html',
  styleUrls: ['./fees-reports.component.scss']
})
export class FeesReportsComponent implements OnInit {
  selectedTable: any;
  title: any;
  constructor(private router: Router) {
    this.selectedTable = this.router.url.split(';')[1]; // should log out 'bar'
  }
  isShowStudentTable = false;
  isShowClassTable = false;
  isShowStudentPewview = false

  ngOnInit(): void {
    console.log(this.selectedTable)
    if (this.selectedTable == 'title=1') {
      this.isShowStudentTable = false;
      this.isShowClassTable = true;
      this.isShowStudentPewview = false;
      this.title = 'Class wise fees report';
    } else if (this.selectedTable == 'title=2') {
      this.isShowStudentTable = true;
      this.isShowClassTable = false;
      this.isShowStudentPewview = false;
      this.title = 'Student wise fees report';
    } else if (this.selectedTable == 'title=3') {
      this.isShowStudentTable = false;
      this.isShowClassTable = false;
      this.isShowStudentPewview = true;
      this.title = 'Student wise fees report';
    }
  }

}
