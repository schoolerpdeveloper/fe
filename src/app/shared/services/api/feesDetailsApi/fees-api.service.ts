import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage/storage.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeesApiService {

  private url = environment.apiEndPoint;
  constructor(public http: HttpClient, private storage: StorageService) {}


  getStudentFeesDetails(admissionNumber: number | string): Observable<any> {
    return this.http.get(
      `${this.url}/feesDetails/admission/${admissionNumber}`
    );
  }
}
