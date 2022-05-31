import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ITransportDeatils } from '@shared/models/transportDetails';

@Component({
  selector: 'app-student-based-transport-card',
  templateUrl: './student-based-transport-card.component.html',
  styleUrls: ['./student-based-transport-card.component.scss','../common-detail.card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentBasedTransportCardComponent implements OnInit {
  @Input() admissionNo: string | number = '';
  @Input() stoppageNo: string | number = '';
  _stoppageName:any={}

  _transportDetails: Array<ITransportDeatils> = [];
  @Input() set transportDetails(value: ITransportDeatils[]) {
    if (!value) this._transportDetails = [];
    else {
      this._transportDetails = [...value];
    }
  }

  constructor() {}

  ngOnInit(): void {}
}