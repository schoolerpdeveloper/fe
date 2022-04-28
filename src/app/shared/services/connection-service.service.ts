import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, fromEvent, merge, EMPTY } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private connectionMonitor: Observable<boolean>;
  currentNetworkStatus = true;

  constructor(@Inject(PLATFORM_ID) platform: any) {
    if (isPlatformBrowser(platform)) {
      const offline$ = fromEvent(window, 'offline').pipe(mapTo(false));
      const online$ = fromEvent(window, 'online').pipe(mapTo(true));
      this.connectionMonitor = merge(offline$, online$).pipe(
        tap((networkStatus: any) => (this.currentNetworkStatus = networkStatus))
      );
    } else {
      this.connectionMonitor = EMPTY;
    }
  }

  monitor(): Observable<boolean> {
    return this.connectionMonitor;
  }
}
