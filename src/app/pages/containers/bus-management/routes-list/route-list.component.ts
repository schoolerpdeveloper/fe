import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusdetailsService } from '@shared/services/api/busDetailsApi/busdetails.service';
@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent {
  searchText = '';
  routeList:any [] =[]
  displayStyle = "none";
  isAction:Boolean = false;
  selectedItem:number = 0;
  modalData:any={}
  constructor(public router:Router, public api:BusdetailsService, private _location: Location) { }

  ngOnInit(): void {
    this.api.getAllRouteDetails().subscribe((data)=>{
      this.routeList = data
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
