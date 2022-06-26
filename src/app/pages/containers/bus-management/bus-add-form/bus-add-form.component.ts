import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { IBusDetails, busDetailsModel } from '@shared/models/busDetails';
import { BusdetailsService } from '@shared/services/api/busDetailsApi/busdetails.service';
import { startWith, debounceTime, takeUntil, map, tap } from 'rxjs/operators';
import { UtilSelector } from 'src/app/pages/pages_store/selectors/util.selector';

@Component({
  selector: 'app-bus-add-form',
  templateUrl: './bus-add-form.component.html',
  styleUrls: ['./bus-add-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AutoUnSubscribeService],
})
export class BusAddFormComponent implements OnInit {
  busDetailsForm!: FormGroup;
  classStud: any[] = [];
  routeList:any[] = []

  // new Array(10)
  //   .fill(0)
  //   .map((i, ind) => ({ label: `class ${ind + 1}`, value: `${ind + 1}` }));
  gender = ['Male', 'Female', 'Other'].map((i) => ({ label: i, value: i }));
  @Output() studentDetailsFormStatus = new EventEmitter<{
    [key: string]: any;
  }>();
  busDetailModel!: IBusDetails;
  @Input() set studentDetails(value: IBusDetails) {
    this.busDetailModel = value ? { ...value } : this.busDetailModel;
  }
  constructor(
    private fb: FormBuilder,
    private destroy$: AutoUnSubscribeService,
    private cdr: ChangeDetectorRef,
    private _location: Location,
    public router:Router, public api:BusdetailsService
  ) {
    this.busDetailModel = { ...busDetailsModel };
  }

  ngOnInit(): void {
    this.getRouteList()
    this.initBusDetailsForm();
  }


  getRouteList(){
    this.api.getAllBusRouteDetails().subscribe((data)=>{
      this.routeList = data.map((i:any) => ({ label: i, value: i }));
    })
  }
  initBusDetailsForm() {
    let busDetails: IBusDetails = { ...this.busDetailModel };
    this.busDetailsForm = this.fb.group({
      BUS_RUTE_CD: [busDetails.BUS_RUTE_CD, [Validators.required]],
      BUS_RUTE_NO: [busDetails.BUS_RUTE_NO, [Validators.required]],
      BUS_RUTE_DRIVER_NAME: [busDetails.BUS_RUTE_DRIVER_NAME, [Validators.required]],
      BUS_RUTE_DRIVER_NO: [busDetails.BUS_RUTE_DRIVER_NO,  [Validators.required]],
      BUS_RUTE_INCH_NAME: [busDetails.BUS_RUTE_INCH_NAME,  [Validators.required]],
      BUS_RUTE_INCH_NO: [busDetails.BUS_RUTE_INCH_NO, [Validators.required]],
      BUS_RUTE_INS_DTL: [busDetails.BUS_RUTE_INS_DTL, [Validators.required]],
      BUS_INSURANCE_DETAILS: [busDetails.BUS_INSURANCE_DETAILS, [Validators.required]],
      BUS_CLEANER_NAME: [busDetails.BUS_CLEANER_NAME, [Validators.required]],
      BUS_CLEANER_MOBILE_NO: [busDetails.BUS_CLEANER_MOBILE_NO,  [Validators.required]],
      BUS_CAMERA_DETAILS: [busDetails.BUS_CAMERA_DETAILS,  [Validators.required]],
      BUS_GPRS_DETAILS: [busDetails.BUS_GPRS_DETAILS,  [Validators.required]],
      BUS_SEAT_CAPACITY: [busDetails.BUS_SEAT_CAPACITY,  [Validators.required]],
      BUS_FC_DETAILS: [busDetails.BUS_FC_DETAILS,  [Validators.required]],
      COMMENTS: [busDetails.COMMENTS,  [Validators.required]]
    });
  }

  onSubmit(){
    console.log(this.busDetailsForm.value)
  }

  back(){
    this._location.back();
  }
}
