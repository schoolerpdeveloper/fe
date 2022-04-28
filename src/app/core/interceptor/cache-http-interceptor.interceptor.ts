// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { ConnectionService } from '@shared/services/connection-service.service';
// import { StorageService } from '@shared/services/localstorage.service';
// import { Observable } from 'rxjs';
// import {
//   tap,
// } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class CachingInterceptorService implements HttpInterceptor {
//   public store: { [key: string]: any } = {};
//   public cache: Map<string, any> = new Map();

//   public excludeURL: string[] = ['/api/postalpincode'];

//   constructor(
//     private networkStatus: ConnectionService,
//     private localStorage: StorageService
//   ) {}
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     console.log(this.cache)
//     // if (this.hasRequestCached(req)) {
//     //   return of(this.returnCahcedRequests(req));
//     // } else {
//       return next.handle(req).pipe(
//         tap((res: any) => {
//           // if(this.excludeURL.find(i=>i.includes(res.url.split(environment.apiUrl)[1]))){

//           if (this.isGetRequest(req)) return this.cacheGETRequest(req, res);
//           else if (this.isOfflineUpdateRequest(req)) {
//             return this.handleOfflineUpdateRequest(req, res);
//           } else;
//           // }
//         })
//       );
//     // }
//   }

//   private cacheGETRequest(req: any, res: any) {
//     if (req.method === 'GET' && res.status === 200) {
//       this.cache.set(req.urlWithParams, res.body);
//     }
//   }

//   private isGetRequest(req: any) {
//     return req.method === 'GET' ? true : false;
//   }

//   private isUpdateRequest(req: any) {
//     return req.method === 'POST' ||
//       req.method === 'PUT' ||
//       req.method === 'DELETE'
//       ? true
//       : false;
//   }

//   private isOfflineUpdateRequest(req: any) {
//     return (
//       (req.method === 'POST' ||
//         req.method === 'PUT' ||
//         req.method === 'DELETE') &&
//       this.networkStatus.currentNetworkStatus === false
//     );
//   }
//   private returnCahcedRequests(req: any) {
//     return this.cache.get(req.urlWithParams);
//   }

//   private hasRequestCached(req: any) {
//     return this.cache.has(req.urlWithParams);
//   }

//   private cachePOSTRequest(req: any, res: any) {
//     if (
//       req.method === 'POST' ||
//       req.method === 'PUT' ||
//       req.method === 'DELETE'
//     ) {
//     }
//   }

//   private handleOfflineUpdateRequest(req: any, res: any) {
//     let data = this.localStorage.get('offline')
//       ? this.localStorage.get('offline')
//       : [];
//     let temp = { url: req.url, method: req.method, body: req.body };
//     if (
//       !this.excludeURL.find((i) =>
//         i.includes(req.url.split(environment.apiUrl)[1])
//       )
//     ) {
//       data.push(temp);
//       data = this.uniqueItems(data);
//     }
//     this.localStorage.setData({ offline: [...data] });
//   }

//   private uniqueItems(array: any) {
//     let unique = [];
//     let temp = '';

//     for (let item of array) {
//       if (temp !== JSON.stringify(item)) unique.push(item);
//       temp = JSON.stringify(item);
//     }
//     return unique;
//   }
// }
