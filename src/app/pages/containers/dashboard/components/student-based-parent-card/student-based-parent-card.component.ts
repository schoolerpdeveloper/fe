import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IParentDetails } from '@shared/models/parentDetails';

@Component({
  selector: 'app-student-based-parent-card',
  templateUrl: './student-based-parent-card.component.html',
  styleUrls: ['./student-based-parent-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentBasedParentCardComponent implements OnInit {
  _parentDetails:Array<IParentDetails>=[];
  @Input() set parentDetails(value:IParentDetails[]){
    if(!value) this._parentDetails = []
    else{
      this._parentDetails = [...value];
    }
  }

  constructor() {}

  ngOnInit(): void {}
}


