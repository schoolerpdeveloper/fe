import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IStudentList } from '@shared/models/studentDetails/student-details.interface';

@Component({
  selector: 'app-student-list-card',
  templateUrl: './student-list-card.component.html',
  styleUrls: ['./student-list-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentListCardComponent implements OnInit {
  studentDetailsList: IStudentList = {};
  payColorClass: string = 'themed-primary';
  paidString: string = 'Not Paid';
  @Input() set _studentDetailsList(value: IStudentList) {
    if (value) {
      this.studentDetailsList = { ...value };
      this.feesPercentCalc(this.studentDetailsList);
      this.toggleSwitch =
        value?.IS_ACTIVE && value.IS_ACTIVE === 'A' ? true : false;
    }
  }
  toggleSwitch: boolean = true;
  @Output() disableStudentDetails = new EventEmitter<{ [key: string]: any }>();
  @Output() routeConfiguration = new EventEmitter<{ [key: string]: any }>();
  @Output() openModalWindow = new EventEmitter<{ [key: string]: any }>();

  constructor() {}

  private feesPercentCalc(value: IStudentList) {
    let totalFees = value?.TOTAL_FEES_AMOUNT
      ? Number(value.TOTAL_FEES_AMOUNT)
      : 1;
    let fees_Percent = value?.FEES_PAID
      ? (value?.FEES_PAID / totalFees) * 100
      : 0;
    fees_Percent = Math.round(fees_Percent);
    if (fees_Percent === 0) {
      this.payColorClass = 'themed-danger';
      this.paidString = 'Not Paid';
    } else if (fees_Percent > 0 && fees_Percent < 100) {
      this.payColorClass = 'themed-accent';
      this.paidString = 'Paid ' + fees_Percent + '%';
    } else if (fees_Percent === 100) {
      this.payColorClass = 'themed-primary';
      this.paidString = 'Fully Paid';
    }
  }

  ngOnInit(): void {}

  toggle() {
    this.toggleSwitch = !this.toggleSwitch;
    this.disableStudentDetails.emit({
      id: this.studentDetailsList.ADMN_NO,
      status: this.toggleSwitch === true ? 'A' : 'I',
    });
  }
  openModalWindowEvent(d: { [key: string]: any }) {
    this.openModalWindow.emit({ ...d });
  }
  routeToFees(studentDetailsList: any) {
    let d = {
      routeTo: 'fees',
      ...(studentDetailsList && { studentDetails: studentDetailsList }),
    };
    this.routeConfiguration.emit({ ...d });
  }
  routeToView(studentDetailsList: any) {
    let d = {
      routeTo: 'student_view',
      ...(studentDetailsList && { studentDetails: studentDetailsList }),
    };
    this.routeConfiguration.emit({ ...d });
  }
}
