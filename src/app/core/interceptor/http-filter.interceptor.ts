import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { StorageService } from '@shared/services/localstorage.service';
import { NotificationService } from '@shared/services/notification.service';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({providedIn:'root'})
export class HttpFilter implements HttpInterceptor {

    // private apiUrl = environment.apiUrl;
    constructor(private storage:StorageService,private notifier:NotificationService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.method.toLowerCase().includes('patch')){
            // this.notifier.successNotification('Successfully Updated')
        }

        return next.handle(this.addAuthentication(request));
    }

    private addAuthentication(request: HttpRequest<any>): HttpRequest<any> {


        if (!request.url.includes('/auth/')) {
            const token =  this.storage.get('token');
            if (token) {
                request = request.clone({
                    setHeaders: {Authorization: 'Bearer ' + token}
                });
            }
        }
        return request;
    }

}