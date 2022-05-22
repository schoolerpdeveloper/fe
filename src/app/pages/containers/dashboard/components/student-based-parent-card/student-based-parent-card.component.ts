import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';
import { IParentDetails } from '@shared/models/parentDetails';
import { IParentDetailsAddress } from '@shared/models/parentDetailsAdress';
@Component({
  selector: 'app-student-based-parent-card',
  templateUrl: './student-based-parent-card.component.html',
  styleUrls: [
    './student-based-parent-card.component.scss',
    '../common-detail.card.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentBasedParentCardComponent implements OnInit {
  _parentDetails: Array<IParentDetails> = [];
  _parentAddressDetails: {[key:string]:any} = {};

  @Output() parentFormAction = new EventEmitter<{
    action: 'add' | 'update';
    data: any
  }>();

  @Input() set parentDetails(value: IParentDetails[]) {
    if (!value) this._parentDetails = [];
    else {
      this._parentDetails = [...value];
    }
  }

  @Input() set parentAddressDetails(value: IParentDetailsAddress[]) {
    if (!value) this._parentAddressDetails = {};
    else {
      let temp:any= {};
      value.map(i=>{
        let code = i?.PRNT_ADRS_CD
        if(code)temp[code] = i;
      });
      this._parentAddressDetails = temp;
    }
  }

  constructor() {}

  ngOnInit(): void {}

  updateDetails(data: IParentDetails) {
    let temp:any = {
      parentDetails:{...data},
    }
    if(data?.PRNT_CD && this._parentAddressDetails[data?.PRNT_CD]){
      temp['addressForm'] = this._parentAddressDetails[data?.PRNT_CD]
    }
    this.parentFormAction.emit({ action: 'update', data:temp });
  }
  addDetails() {
    let data = null;
    this.parentFormAction.emit({ action: 'add', data });
  }
}
