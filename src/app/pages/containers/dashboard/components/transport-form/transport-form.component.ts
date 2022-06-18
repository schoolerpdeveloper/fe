import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { IStudentDetails } from '@shared/models/studentDetails';
import {
  ITransportDeatils,
  transportDetailModel,
} from '@shared/models/transportDetails';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-transport-form',
  templateUrl: './transport-form.component.html',
  styleUrls: ['./transport-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AutoUnSubscribeService],
})
export class TransportFormComponent implements OnInit {
  transportDetailsForm!: FormGroup;
  @Input() _studentDetails: IStudentDetails[] = [];
  _routes: ITransportDeatils[] = [];
  _routesSelect: any = [];

  @Input() set routes(value: ITransportDeatils[]) {
    if (value && Array.isArray(value) && value.length) {
      this._routes = [...value];
      this._routesSelect = value.map((i: any) => ({
        label: i.BUS_RUTE_CD,
        value: i.BUS_RUTE_CD,
      }));
    }
  }
  _stoppage: any[] = [];
  @Output() transportDetailFormStatus = new EventEmitter<{
    [key: string]: any;
  }>();
  classStud = new Array(10)
    .fill(0)
    .map((i, ind) => ({ label: `class ${ind + 1}`, value: `${ind + 1}` }));
  gender = ['Male', 'Female', 'Other'].map((i) => ({ label: i, value: i }));
  sibling = ['Brother', 'Sister'].map((i) => ({ label: i, value: i }));
  transportDetails!: ITransportDeatils;

  constructor(
    private fb: FormBuilder,
    private destroy$: AutoUnSubscribeService
  ) {
    this.transportDetails = { ...transportDetailModel };
  }
  ngOnInit(): void {
    this.initTransportDetailsForm();
    this.transportDetailsForm
      .get('BUS_RUTE_CD')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        console.log(d);
        if (!d) this._stoppage = [];
        else {
          let matchedRoute = this._routes.find(
            (i: any) => i.BUS_RUTE_CD.toLowerCase() === d.toLowerCase()
          );
          this._stoppage = !matchedRoute?.bus_route_details?.length
            ? []
            : matchedRoute?.bus_route_details.map((i: any) => ({
                label: i.rute_stop_name,
                value: i.rute_stop_no,
              }));
        }
      });
    this.transportDetailsForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        let temp = {
          transportDetail: {
            data: d,
            valid: this.transportDetailsForm.valid,
          },
        };
        this.transportDetailFormStatus.emit(temp);
      });
  }
  initTransportDetailsForm() {
    let transportDetails: ITransportDeatils = { ...this.transportDetails };
    this.transportDetailsForm = this.fb.group({
      ADMN_NO: [transportDetails.ADMN_NO, [Validators.required]],
      BUS_RUTE_CD: [transportDetails.BUS_RUTE_CD, []],
      BUS_RUTE_NO: [transportDetails.BUS_RUTE_NO, []],
      BUS_RUTE_DRIVER_NAME: [transportDetails.BUS_RUTE_DRIVER_NAME, []],
      BUS_RUTE_DRIVER_NO: [transportDetails.BUS_RUTE_DRIVER_NO, []],
      BUS_RUTE_INCH_NAME: [transportDetails.BUS_RUTE_INCH_NAME, []],
      BUS_RUTE_INCH_NO: [transportDetails.BUS_RUTE_INCH_NO, []],
      BUS_RUTE_INS_DTL: [transportDetails.BUS_RUTE_INS_DTL, []],
      RUTE_STOP_NO: [transportDetails.RUTE_STOP_NO, []],
    });
  }
  captureAdmissionNo(e: any) {
    if (e.ADMN_NO) this.transportDetailsForm.patchValue({ ADMN_NO: e.ADMN_NO });
  }
}
