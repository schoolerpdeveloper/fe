import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { IStudentDetails } from '@shared/models/studentDetails';

@Component({
  selector: 'app-student-detail-card',
  templateUrl: './student-detail-card.component.html',
  styleUrls: ['./student-detail-card.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class StudentDetailCardComponent implements OnInit {

  @Input() studentlist:IStudentDetails = {}
  

  constructor() { }

  ngOnInit(): void {
  }

}
