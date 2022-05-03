import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage/storage.service';
import { IStudentDetails } from '@shared/models/studentDetails';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentdetailsService {
  private url = environment.apiEndPoint;

  constructor(public http: HttpClient, private storage: StorageService) {}

  getAllStudentDetails(): Observable<any> {
    return this.http.get(`${this.url}/studentdetails`);
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
  ): Observable<IStudentDetails> {
    return this.http.put(`${this.url}/studentdetails/${id}`, data);
  }

  deleteSingleStudentDetails(id: string | number): Observable<IStudentDetails> {
    return this.http.delete(`${this.url}/studentdetails/${id}`);
  }
}
