import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISiblingDetails } from '@shared/models/siblingDeatils';

@Component({
  selector: 'app-student-based-sibiling-card',
  templateUrl: './student-based-sibiling-card.component.html',
  styleUrls: ['./student-based-sibiling-card.component.scss','../common-detail.card.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class StudentBasedSibilingCardComponent implements OnInit {
  @Input() admissionNo: string | number = '';

  _siblingdetails:Array<ISiblingDetails>=[];
  @Input() set sibilingDetails(value:ISiblingDetails[]){
    if(!value) this._siblingdetails = []
    else{
      console.log(value)
      this._siblingdetails = [...value];
    }
  }
  @Output() sibilingFormAction = new EventEmitter<{
    action: 'add' | 'update' | 'delete';
    data: any;
  }>();

  ngOnInit(): void {}

  updateDetails(detail: any) {
    this.sibilingFormAction.emit({ action: 'update', data: { ...detail } });
  }

  addDetails(detail: any) {
    if (!detail) {
      detail = {
        ADMN_NO: this.admissionNo,
      };
    }
    this.sibilingFormAction.emit({
      action: 'add',
      data: detail,
    });
  }
  deleteDetails(detail: any) {
    this.sibilingFormAction.emit({ action: 'delete', data: { ...detail } });
  }


}
