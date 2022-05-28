import { ChangeDetectionStrategy, Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import { IStudentDetails } from '@shared/models/studentDetails';

@Component({
  selector: 'app-student-detail-card',
  templateUrl: './student-detail-card.component.html',
  styleUrls: ['./student-detail-card.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class StudentDetailCardComponent implements OnInit {

  @Input() studentlist:IStudentDetails = {}
  @Input() admissionNo: string | number = '';
 @Output() studentFormAction = new EventEmitter<{
    action: 'add' | 'update' | 'delete';
    data: any;
  }>();

  constructor() { }

  ngOnInit(): void {
  }
  updateDetails(detail: any) {
    this.studentFormAction.emit({ action: 'update', data: { ...detail } });
  }

  addDetails(detail: any) {
    if (!detail) {
      detail = {
        ADMN_NO: this.admissionNo,
      };
    }
    this.studentFormAction.emit({
      action: 'add',
      data: detail,
    });
  }
  deleteDetails(detail: any) {
    this.studentFormAction.emit({ action: 'delete', data: { ...detail } });
  }

}
