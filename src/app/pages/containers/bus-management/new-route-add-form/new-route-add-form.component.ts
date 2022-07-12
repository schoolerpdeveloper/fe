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
import { BusdetailsService } from '@shared/services/api/busDetailsApi/busdetails.service';

@Component({
  selector: 'app-new-route-add-form',
  templateUrl: './new-route-add-form.component.html',
  styleUrls: ['./new-route-add-form.component.scss']
})
export class NewRouteAddFormComponent implements OnInit {
  // routeDetailsForm!: FormGroup;
  public routeDetailsForm!: FormGroup;

  routeList: any;

  submitted = false;

  constructor(
    private fb: FormBuilder,
    private _location: Location,
    public router: Router, public api: BusdetailsService
  ) {
    this.getRouteList()
  }

  ngOnInit(): void {

  }


  getRouteList() {
    this.api.getAllBusRouteDetails().subscribe((data) => {
      if (data.length > 0) {
        this.routeList = data.map((i: any) => ({ label: i.BUS_RUTE_CD, value: i.BUS_RUTE_CD }))
        this.initBusDetailsForm();

      } else {
        this.routeList = [{ label: "No Routes", value: '' }]
        this.initBusDetailsForm();
      }

    })

    // this.routeList = [{BUS_RUTE_CD:'route 1'}, {BUS_RUTE_CD:'route 2'}, {BUS_RUTE_CD:'route 3'}].map((i:any) => ({ label: i.BUS_RUTE_CD, value: i.BUS_RUTE_CD }))
  }
  initBusDetailsForm() {
    // let busDetails = { ...this.busDetailModel };
    this.routeDetailsForm = this.fb.group({
      BUS_RUTE_CD: ['', [Validators.required]],
      ACADEMIC_ID: ['', [Validators.required]],
      BUS_RUTE_NO: ['', [Validators.required]],
      BUS_RUTE_DRIVER_NAME: ['', [Validators.required]],
      BUS_RUTE_DRIVER_NO: ['', [Validators.required]],
      BUS_RUTE_INCH_NAME: ['', [Validators.required]],
      BUS_RUTE_INCH_NO: ['', [Validators.required]],
      BUS_RUTE_INS_DTL: ['', [Validators.required]],
      BUS_CLEANER_NAME: ['', [Validators.required]],
      BUS_CLEANER_MOBILE_NO: ['', [Validators.required]],
      BUS_CAMERA_DETAILS: ['', [Validators.required]],
      BUS_GPRS_DETAILS: ['', [Validators.required]],
      BUS_SEAT_CAPACITY: ['', [Validators.required]],
      BUS_FC_DETAILS: ['', [Validators.required]],
      COMMENTS: ['', [Validators.required]]
    });

  }

  get f() { return this.routeDetailsForm.controls; }

  onSubmit() {
    console.log(this.routeDetailsForm.value)
    this.submitted = true;

    // stop here if form is invalid
    if (this.routeDetailsForm.invalid) {
      return;
    }
    else {
      this.api.addBusDetails(this.routeDetailsForm.value).subscribe((data) => {
        console.log(data)
        
        this.router.navigate(['/pages/bus-management/list-bus'])
      })
    }
  }

  back() {
    this._location.back();
  }
}
