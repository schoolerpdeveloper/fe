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

@Component({
  selector: 'app-bus-add-form',
  templateUrl: './bus-add-form.component.html',
  styleUrls: ['./bus-add-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AutoUnSubscribeService],
})
export class BusAddFormComponent implements OnInit {
  // busDetailsForm!: FormGroup;
  public busDetailsForm!: FormGroup;
  classStud: any[] = [];
  routeList:any;
  isShowForm = false
  submitted = false;
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
  }


  getRouteList(){
    this.api.getAllBusRouteDetails().subscribe((data)=>{
      if(data.length > 0){
        this.routeList = data.map((i:any) => ({ label: i.BUS_RUTE_CD, value: i.BUS_RUTE_CD }))      
        
      }else{
        this.routeList = [{ label: "No Routes", value: '' }]
      }

      console.log(this.routeList)
      this.initBusDetailsForm();
      
    })
  }
  initBusDetailsForm() {
    this.isShowForm = true
    // let busDetails = { ...this.busDetailModel };
    this.busDetailsForm = this.fb.group({
      BUS_RUTE_CD: ['', [Validators.required]],
      BUS_RUTE_NO: ['', [Validators.required]],
      BUS_RUTE_DRIVER_NAME: ['', [Validators.required]],
      BUS_RUTE_DRIVER_NO: ['',  [Validators.required]],
      BUS_RUTE_INCH_NAME: ['',  [Validators.required]],
      BUS_RUTE_INCH_NO: ['', [Validators.required]],
      BUS_RUTE_INS_DTL: ['', [Validators.required]],
      // BUS_INSURANCE_DETAILS: ['', [Validators.required]],
      BUS_CLEANER_NAME: ['', [Validators.required]],
      BUS_CLEANER_MOBILE_NO: ['',  [Validators.required]],
      BUS_CAMERA_DETAILS: ['',  [Validators.required]],
      BUS_GPRS_DETAILS: ['',  [Validators.required]],
      BUS_SEAT_CAPACITY: ['',  [Validators.required]],
      BUS_FC_DETAILS: ['',  [Validators.required]],
      COMMENTS: ['',  [Validators.required]]
    });

  }

  get f() { return this.busDetailsForm.controls; }

  onSubmit(){
    console.log(this.busDetailsForm.value)
    this.submitted = true;

        // stop here if form is invalid
        if (this.busDetailsForm.invalid) {
            return;
        }
  }

  back(){
    this._location.back();
  }
}
