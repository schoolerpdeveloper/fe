import { TestBed } from '@angular/core/testing';

import { LoginApiService } from './api.service';

describe('LoginApiService', () => {
  let service: LoginApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
