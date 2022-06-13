import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage/storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportApiService {

  private url = environment.apiEndPoint;

  constructor(public http: HttpClient, private storage: StorageService) {}


  getBusRouteDetails(busRouteCode:string|number){

    return this.http.get(`${this.url}/busroutedetails/${busRouteCode}`);

  }

  allBusRouteDetails(){
    return this.http.get(`${this.url}/busroutedetails`);

  }
}
