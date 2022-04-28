import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggingInterceptor implements HttpInterceptor {
  private canExecuteLogger = true;
  //environment.production ? false : true;

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.canExecuteLogger) {
      const startTime = Date.now();
      let status: string;
      return next.handle(request).pipe(
        tap((event) => {
          status = event instanceof HttpResponse ? 'success' : 'failure';
        }),
        finalize(() => {
          const elapsedTime = Date.now() - startTime;
          let params = request.urlWithParams.split('?')[1];
          params = params ? params.split('&').join(', ') : 'no params';
          const message = `
📡 METHOD 📡 => ${request.method}
🔗 URL    🔗 => ${request.url}
📝 PARAMS 📝 => ${params}
📇 STATUS 📇 => ${status}
⌚ Time   ⌚ => ${elapsedTime}
`;
          this.logDetails(message, status);
        })
      );
    }

    return next.handle(request);
  }
  private logDetails(msg: string, status: string = 'failure') {
    let color: string = '';
    switch (status) {
      case 'success':
        color = 'Green';
        break;
      case 'failure':
        color = 'Red';
        break;
    }
    color = `color:${color};font-size:0.85rem;padding:0.25rem`;

    console.log(`%c ${msg}`, color);
  }
}
