import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusdetailsService } from '@shared/services/api/busDetailsApi/busdetails.service';
@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss']
})
export class BusListComponent {
  searchText = '';
  busList:any [] =[]
  displayStyle = "none";
  modalData:any={}
  constructor(public router:Router, public api:BusdetailsService, private _location: Location) { }

  ngOnInit(): void {
    this.api.getAllBusDetails().subscribe((data)=>{
      this.busList = data
    })
  }

  back(){
    this._location.back();
  }


  
  openPopup(val:any) {
    this.modalData = val
    this.displayStyle = "block";
  }
  closePopup() {
    this.modalData = {}
    this.displayStyle = "none";
  }


}
