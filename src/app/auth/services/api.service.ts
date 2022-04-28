import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { StorageService } from '@core/services/storage/storage.service';
import { IRegistration, ISignIn } from 'src/app/utility/interfaces/login.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  private url = environment.apiEndPoint 

  constructor(public http:HttpClient,private storage:StorageService) { }

  login(data:ISignIn){
    return this.http.post(`${this.url}/auth/signin`,{...data}).pipe(tap((d:any)=>{
      if(d?.accessToken){
        
        this.storage.setData({session:{...d}})
      }
    }))
  }
  register(data:IRegistration){
    return this.http.post(`${this.url}/auth/signup`,{...data}).pipe(tap(d=>console.log(d)))
  }
}
