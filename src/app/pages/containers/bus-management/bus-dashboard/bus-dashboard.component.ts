import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeesManagementApiService } from '@shared/services/api/feesManagementApi/feesmanagement-api.service';

@Component({
  selector: 'app-bus-dashboard',
  templateUrl: './bus-dashboard.component.html',
  styleUrls: ['./bus-dashboard.component.scss']
})
export class BusManagementDashboardComponent implements OnInit {
  SchoolFeesStats: any = []
  classWiseFeesStats: any[] = []
  doughnutChartData:any[]=[]
  barLabels:any[] = []
  barData:any[] = []
  barDataLabel:any[] = []

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
