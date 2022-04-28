import { TestBed } from '@angular/core/testing';

import { HttpErrorFilterInterceptor } from './http-error-filter.interceptor';

describe('HttpErrorFilterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpErrorFilterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpErrorFilterInterceptor = TestBed.inject(HttpErrorFilterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
