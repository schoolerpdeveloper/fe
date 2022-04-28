import { TestBed } from '@angular/core/testing';

import { LoginPresenterService } from './login-presenter.service';

describe('LoginPresenterService', () => {
  let service: LoginPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
