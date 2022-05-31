import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() dataLabels: string[] = []
  @Input() data: any[] = []
  @Input() label: any[] = []


  colors: string[] = ['#67d63c', '#ec8c23','#ec8c35']
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        display:false
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Class wise fees', backgroundColor: '#67d63c' },
      // { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B', backgroundColor:'#ec8c23' }
    ]
  };


  public barChartColors: any[] = [
    { backgroundColor: 'red' },
    { backgroundColor: 'green' },
  ]

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40];

    this.chart?.update();
  }



  generateDataSet() {
    let datasets = []
    if (this.dataLabels) {
      for (let i = 0; i < this.dataLabels.length; i++) {
        datasets.push(
          { data: this.data[i], label: this.dataLabels[i], backgroundColor: this.colors[i] })
      }

      
    }
    return datasets

  }

  ngOnInit() {
    let datasets:any[] = this.generateDataSet();
    this.barChartData = {
      labels: [...this.label],
      datasets: [
        ...datasets
      ]
    };
  }
}
