import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ISiblingDetails } from '@shared/models/siblingDeatils';

@Component({
  selector: 'app-student-based-sibiling-card',
  templateUrl: './student-based-sibiling-card.component.html',
  styleUrls: ['./student-based-sibiling-card.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class StudentBasedSibilingCardComponent implements OnInit {

  _siblingdetails:Array<ISiblingDetails>=[];
  @Input() set parentDetails(value:ISiblingDetails[]){
    if(!value) this._siblingdetails = []
    else{
      this._siblingdetails = [...value];
    }
  }

  constructor() {}

  ngOnInit(): void {}

}
