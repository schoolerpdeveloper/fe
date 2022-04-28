import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { StorageService } from '@shared/services/localstorage.service';
import { NotificationService } from '@shared/services/notification.service';
import { Router } from '@angular/router';
declare var window:Window;
@Injectable({ providedIn: 'root' })
export class HttpErrorFilter implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private notification: NotificationService,
    private storage: StorageService,
    private router:Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
      
        if (error.status?.toString() === '500') {
          this.genericMessage({message:`Something went wrong. Please try later`})
        }
        if (error.status?.toString() === '401') {
          this.router.navigateByUrl('auth/login');
          // window.location.reload()
          
        }
        if (error.status?.toString() === '400') {
          if (error?.error?.name?.toLowerCase() === 'httperrorresponse') {
            this.handleHTTPErrorResponse(error.error);
          }
          if (error?.error?.name?.toLowerCase() === 'httpexception') {
            this.handleHTTPExceptions(error.error);
          }
        }
        //     if (error.status === 401 && !request.url.includes('auth/signin')) {
        //         return this.handle401Error(request, next);
        //     }
        return of(error);
        // throwError(error);
        // console.log(error)
        // return EMPTY;
      })
    );
  }

  private handleHTTPErrorResponse(e: any) {
    this.notification.errorNotification(Array.isArray(e.message) ? e.message.join(): e.message)

  }

  private genericMessage(e: any) {
    this.notification.errorNotification(Array.isArray(e.message) ? e.message.join(): e.message)

  }

  private handleHTTPExceptions(e: any) {
    // let style = {
    //   style: {
    //     'box-shadow':
    //       '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    //     padding: '16px',
    //     color: '#dc3545',
    //   },
    // };

    // let position: { [key: string]: string } = { position: 'top-right' };

    // if (this.storage.get('currentScreenSize').toLowerCase().includes('small')) {
    //   position = { position: 'top-center' };
    // }

    // this.toast.error(e.message, { ...style, ...position });

    this.notification.errorNotification(e.message)
  }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

  //     if (request.url.includes('auth/refreshtoken')) {
  //         this.isRefreshingToken = false;
  //         // return of(<any>this.authenticationService.logout());
  //     }
  //     if (!this.isRefreshingToken) {
  //         this.isRefreshingToken = true;
  //         this.tokenSubject.next(null);

  //         return this.authenticationService.refresh().pipe(switchMap(token => {
  //             if (token) {
  //                 this.tokenSubject.next(token.value);
  //                 return next.handle(request);
  //             }
  //             return of(<any>this.authenticationService.logout());
  //         }),
  //         catchError(err => {
  //             this.authenticationService.logout();
  //             return throwError(err.error);
  //         }),
  //         finalize(() => {
  //             this.isRefreshingToken = false;
  //         }));
  //     } else {
  //         this.isRefreshingToken = false;

  //         return this.tokenSubject
  //             .pipe(filter(token => token != null),
  //             take(1),
  //             switchMap(token => {
  //                 return next.handle(request);
  //             }));
  //     }
  // }
}
