import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage/storage.service';
import { IStudentDetails } from '@shared/models/studentDetails';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BusdetailsService {
  private url = environment.apiEndPoint;

  constructor(public http: HttpClient, private storage: StorageService) {}

  getAllBusDetails(): Observable<any> {
    return this.http.get(`${this.url}/busdetails`);
  }
  getAllBusRouteDetails(): Observable<any> {
    return this.http.get(`${this.url}/busroutedetails`);
  }
  createStudentDetails(data: IStudentDetails) {
    return this.http.post(`${this.url}/studentdetails`, data);
  }

  getSingleStudentDetails(id: string | number): Observable<IStudentDetails> {
    return this.http.get(`${this.url}/studentdetails/${id}`);
  }

  updateSingleStudentDetails(
    id: string | number,
    data: IStudentDetails
  ): Observable<any> {
    let temp = { ...data };
    delete temp.ADMN_NO;
    return this.http.put(`${this.url}/studentdetails/${id}`, temp);
  }
  addSingleStudentDetails(data: IStudentDetails): Observable<any> {
    return this.http.post(`${this.url}/studentdetails`, data);
  }
  deleteSingleStudentDetails(
    data: IStudentDetails
  ): Observable<IStudentDetails> {
    let id = data.ADMN_NO;
    return this.http.delete(`${this.url}/studentdetails/${id}`);
  }

  studentListService() {
    return this.http.get(`${this.url}/studentutil`);
  }
}
