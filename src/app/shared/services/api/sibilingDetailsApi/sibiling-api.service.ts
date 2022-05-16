import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage/storage.service';
import { ISiblingDetails } from '@shared/models/siblingDeatils';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SibilingApiService {
  private url = environment.apiEndPoint;
  constructor(public http: HttpClient, private storage: StorageService) {}

  getAllsiblingdetails(): Observable<any> {
    return this.http.get(`${this.url}/siblingdetails`);
  }

  getStudentsiblingdetails(admissionNumber: number | string): Observable<any> {
    return this.http.get(`${this.url}/siblingdetails/${admissionNumber}`);
  }

  getsiblingdetails(id: number | string): Observable<any> {
    return this.http.get(`${this.url}/siblingdetails/${id}`);
  }

  updatesiblingdetails(details: ISiblingDetails): Observable<any> {
    let id = details.ID;
    return this.http.put(`${this.url}/siblingdetails/${id}`, details);
  }
}
