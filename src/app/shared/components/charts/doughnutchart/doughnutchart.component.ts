import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnutchart',
  templateUrl: './doughnutchart.component.html',
  styleUrls: ['./doughnutchart.component.scss']
})
export class DoughnutchartComponent  {
// Doughnut
@Input() label:string[] = []
@Input() data:any[] = []

public doughnutChartLabels: string[] = [ 'Fees Collectedwwww', 'Pending Feeswww'];
public doughnutChartData: ChartData<'doughnut'> = {
  labels: this.doughnutChartLabels,
  datasets: [
    { data: [ ],
      backgroundColor: [
        "#67d63c",
        "#ec8c23",
        "#FFCE56"
      ],
      hoverBackgroundColor: [
        "#67d63c",
        "#ec8c23",
        "#FFCE56"
      ] }
  ]
};
public doughnutChartType: ChartType = 'doughnut';

// public doughnutChartColors: any[] = [{
//   backgroundColor: ['#f1c40f', '#2ecc71', '#e74c3c']
//  }];

// events
public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
  console.log(event, active);
}

ngOnInit(){
  this.doughnutChartLabels = this.label
  console.log(this.data, this.label)

   this.doughnutChartData = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.data,
        backgroundColor: [
          "#67d63c",
          "#ec8c23",
          "#FFCE56"
        ],
        hoverBackgroundColor: [
          "#67d63c",
          "#ec8c23",
          "#FFCE56"
        ],
        hoverBorderColor: "rgb(231, 231, 231)", }
    ]
  };
}

}
