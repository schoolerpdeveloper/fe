import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFeesDeatils } from '@shared/models/feesDetails';
import { IParentAddressDetails } from '@shared/models/parentDetailsAdress/parent-details-address.interface';

@Component({
  selector: 'app-student-based-fees-card',
  templateUrl: './student-based-fees-card.component.html',
  styleUrls: [
    './student-based-fees-card.component.scss',
    '../common-detail.card.scss',
  ],
})
export class StudentBasedFeesCardComponent implements OnInit {
  temp = new Array(2).fill(0);
  d = new Date().getTime();
  currency =  3000;
  @Input() admissionNo: string | number = '';
  _feesDetails: IFeesDeatils[]=[];


  @Input() set feesDetails(value: IFeesDeatils[]) {
    if (value) {
      this._feesDetails = [...value]
    }
  }
  @Output() feesFormAction = new EventEmitter<{
    action: 'add' | 'update' | 'delete';
    data: any;
  }>();
  constructor() {}

  ngOnInit(): void {}
}
