import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeesManagementApiService } from '@shared/services/api/feesManagementApi/feesmanagement-api.service';

@Component({
  selector: 'app-fees-dashboard',
  templateUrl: './fees-dashboard.component.html',
  styleUrls: ['./fees-dashboard.component.scss']
})
export class FeesManagementDashboardComponent implements OnInit {
  SchoolFeesStats: any = []
  classWiseFeesStats: any[] = []
  doughnutChartData:any[]=[]
  barLabels:any[] = []
  barData:any[] = []
  barDataLabel:any[] = []

  secondCardRow = [
    {
      header: 'Class Wise Fees',
      amount: '14K',
      upDownVal: 34,
      id: 1
    },
    {
      header: 'Student Fees Report',
      amount: '14K',
      upDownVal: 34,
      id: 2
    },
    {
      header: 'Download Fees Recipet',
      amount: '14K',
      upDownVal: 34,
      id: 3
    }
  ];
  constructor(public router: Router, public api: FeesManagementApiService) { }

  ngOnInit(): void {
    this.api.getAllFeesDetails().subscribe((data) => {
      console.log('data', data)
      this.SchoolFeesStats = data[0]
      this.doughnutChartData = [this.SchoolFeesStats.total_school_fees_collection, this.SchoolFeesStats.pending_fees]

    })

    this.getClassWiseReport()
  }

  getClassWiseReport() {
    this.api.getAllClassWiseFees().subscribe((data) => {
      console.log('data', data)
      this.classWiseFeesStats = data

      if(data && data.length>0){
        let totFees:any[] = []
        let pendingFees:any[] = []
        data.forEach((item:any) => {  
          this.barLabels.push(item.CLASS_NAME)
          totFees.push(item.TOTAL_FEES_CLASS_WISE)
          pendingFees.push(item.TOTAL_FEES_CLASS_WISE - item.FEES_AMOUNT)
      });
      this.barData = [totFees, pendingFees]
      this.barDataLabel = ['Total Fees', 'Pending Fees']
      }
    })
  }

  // clickToView(data:any){
  //   console.log(data)
  //   this.router.navigate(['/pages/fees-report',{title:data.id}])
  // }
}
