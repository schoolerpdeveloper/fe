import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage/storage.service';
import { IParentDetails } from '@shared/models/parentDetails';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentApiService {
  private url = environment.apiEndPoint;
  constructor(public http: HttpClient, private storage: StorageService) {}

  getAllParentDetails(): Observable<any> {
    return this.http.get(`${this.url}/parentdetails`);
  }

  getStudentParentDetails(admissionNumber:number|string): Observable<any> {
    return this.http.get(`${this.url}/parentdetails/${admissionNumber}`);
  }
  
  getParentDetails(id:number|string): Observable<any> {
    return this.http.get(`${this.url}/parentdetails/${id}`);
  }
  
  updateParentDetails(parentDetails:IParentDetails):Observable<any>{
    let id = parentDetails.ID
    return this.http.put(`${this.url}/parentdetails/${id}`,parentDetails);
  }
  
}
