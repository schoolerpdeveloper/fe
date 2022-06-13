import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChange,
} from '@angular/core';
import { ITransportDeatils } from '@shared/models/transportDetails';

@Component({
  selector: 'app-student-based-transport-card',
  templateUrl: './student-based-transport-card.component.html',
  styleUrls: [
    './student-based-transport-card.component.scss',
    '../common-detail.card.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentBasedTransportCardComponent implements OnInit {
  @Input() admissionNo: string | number = '';
  @Input() stoppageNo: string | number = '';

  _stoppageName: any = {};

  _transportDetails: Array<ITransportDeatils> = [];
  @Input() set transportDetails(value: ITransportDeatils[]) {
    if (value.length === 0) this._transportDetails = [];
    else {
      this._transportDetails = [...value];
      this._stoppageName =
        this.stoppageNo &&
        value[0]?.bus_route_details?.find(
          (i: any) => i?.rute_stop_no === +this.stoppageNo && i
        );
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}
}
