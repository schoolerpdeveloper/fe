import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage/storage.service';
import { IParentDetails } from '@shared/models/parentDetails';
import { IParentDetailsAddress } from '@shared/models/parentDetailsAdress';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export const mockParentDetails: IParentDetails[] = [
  {
    ID: 1,
    ADMN_NO: '9999',
    PRNT_CD: 1,
    PRNT_EDUC: 'srini',
    PRNT_OCCU: 'notowkring',
    PRNT_AADH_NO: 'test',
    PRNT_PHNE_NO: 'test5',
    PRNT_EMAIL_ID: 'test7',
    FIRST_NAME: 'Srini',
    LAST_UPDT_TS: '2022-04-24T05:29:29.000Z',
  },
  {
    FIRST_NAME: 'Sri',

    ID: 2,
    ADMN_NO: '1000',
    PRNT_CD: 22,
    PRNT_EDUC: 'ra',
    PRNT_OCCU: 'arrrr',
    PRNT_AADH_NO: '2rrrr',
    PRNT_PHNE_NO: '2',
    PRNT_EMAIL_ID: '2',
    LAST_UPDT_TS: '2022-04-24T05:29:29.000Z',
  },
];
@Injectable({
  providedIn: 'root',
})
export class ParentApiService {
  private url = environment.apiEndPoint;
  constructor(public http: HttpClient, private storage: StorageService) {}

  getAllParentDetails(): Observable<any> {
    return this.http.get(`${this.url}/parentdetails`);
  }

  getStudentParentDetails(admissionNumber: number | string): Observable<any> {
    return this.http.get(
      `${this.url}/parentdetails/admission/${admissionNumber}`
    );
  }

  getParentDetails(id: number | string): Observable<any> {
    return this.http.get(`${this.url}/parentdetails/${id}`);
  }

  updateParentDetails(parentDetails: IParentDetails): Observable<any> {
    let id = parentDetails.ID;
    return this.http.put(`${this.url}/parentdetails/${id}`, parentDetails);
  }
  addParentDetails(parentDetails: IParentDetails): Observable<any> {

    return this.http.post(`${this.url}/parentdetails`, parentDetails);
  }
  deleteParentDetails(parentDetails: IParentDetails): Observable<any> {
    let id = parentDetails.ID;
    return this.http.delete(`${this.url}/parentdetails/${id}`);
  }
  updateAddress(addressDetails:IParentDetailsAddress):Observable<any>{
    let id = addressDetails?.ID;
    return this.http.put(`${this.url}/addressdetails/${id}`, addressDetails);
  }
  addAddress(addressDetails:IParentDetailsAddress):Observable<any>{
    return this.http.post(`${this.url}/addressdetails`, addressDetails);
  }
  getStudentBasedParentAddressDetails(admissionNumber: number | string): Observable<any> {
    return this.http.get(
      `${this.url}/parentdetails/admission/${admissionNumber}?address`
    );
  }
}
