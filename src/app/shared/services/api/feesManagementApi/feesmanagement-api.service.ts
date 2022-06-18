import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage/storage.service';
import { IParentDetails } from '@shared/models/parentDetails';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeesManagementApiService {
  private url = environment.apiEndPoint;
  constructor(public http: HttpClient, private storage: StorageService) {}

  getAllFeesDetails(): Observable<any> {
    return this.http.get(`${this.url}/studentfeesdtl/feestotaldetails/all`);
  }

  getAllClassWiseFees(): Observable<any> {
    return this.http.get(`${this.url}/studentfeesdtl/classwisefees/all`);
  }
  getAllstudentWiseFeesReport(): Observable<any> {
    return this.http.get(`${this.url}/studentfeesdtl`);
  }
  getAllClassFeesStructure(): Observable<any> {
    return this.http.get(`${this.url}/studentfeesdtl/classfeesStructure/all`);
  }

  getStudentParentDetails(admissionNumber:number|string): Observable<any> {
    return this.http.get(`${this.url}/parentdetails/${admissionNumber}`);
  }
  getSingleStudentFeesDetails(admissionNumber:number|string): Observable<any> {
    return this.http.get(`${this.url}/studentfeesdtl/admission/${admissionNumber}`);
  }
  feesPay(): Observable<any> {
    return this.http.get(`${this.url}/studentfeesdtl/feespay/all`);
  }
  feesPayHistory(params:any): Observable<any> {
    // const headerDict = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    //   'class_id':params.STUD_CLASS,
    //   'accademic_id':params.ACADEMIC_ID,
    //   'admn_no':params.ADMN_NO
    // }
    // const requestOptions = {                                                                                                                                                                                 
    //   headers: new HttpHeaders(headerDict), 
    // };
    return this.http.get(`${this.url}/feesdetails/admission/${params}`);
  }

  payFees(data: any): Observable<any> {
    return this.http.post(`${this.url}/feesdetails`, data);
  }
  

  allStudentsFeesDetails(): Observable<any> {
    return this.http.get(`${this.url}/studentfeesdtl/studentfeesdetailsdisplay/all`);
  }

  getSingleStudentDetailsAndFeesStruct(params:any){
    return this.http.get(`${this.url}/studentfeesdtl/studentwisecomplete/${params}`);
  }
  
}
