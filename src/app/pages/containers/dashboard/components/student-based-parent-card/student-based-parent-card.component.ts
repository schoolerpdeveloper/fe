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
import { IParentAddressDetails } from '@shared/models/parentDetailsAdress/parent-details-address.interface';
export enum PARENT_REL_TYPE {
  Father = 1,
  Mother = 2,
  Gaurdian = 3,
}
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
  @Input() admissionNo: string | number = '';

  _parentAddressDetails: IParentAddressDetails[] = [];

  @Output() parentFormAction = new EventEmitter<{
    action: 'add' | 'update' | 'delete';
    data: any;
  }>();

  @Input() set parentDetails(value: IParentDetails[]) {
    // if (value) {
    //   this._parentDetails = [...value];
    // }
  }

  @Input() set parentAddressDetails(value: IParentAddressDetails[]) {
    if (value) {
      this._parentAddressDetails = [...value]
    }
  }

  constructor() {}

  ngOnInit(): void {}

  updateDetails(detail: any) {
    this.parentFormAction.emit({ action: 'update', data: { ...detail } });
  }

  addDetails(detail: any) {
    if (!detail) {
      detail = {
        ADMN_NO: this.admissionNo,
        addressDetails: { ADMN_NO: this.admissionNo },
      };
    }
    this.parentFormAction.emit({
      action: 'add',
      data: {
        ADMN_NO: detail.ADMN_NO,
        ...{ detail },
        address_details: { ADMN_NO: detail.ADMN_NO },
      },
    });
  }
  deleteDetails(detail: any) {
    this.parentFormAction.emit({ action: 'delete', data: { ...detail } });
  }

  relationInfo(code: string | number | undefined) {
    code = code ? Number(code) : 0;
    if (!code) return;
    return PARENT_REL_TYPE[code];
  }
}
