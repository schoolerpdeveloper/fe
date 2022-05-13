import { TestBed } from '@angular/core/testing';

import { SibilingApiService } from './sibiling-api.service';

describe('SibilingApiService', () => {
  let service: SibilingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SibilingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
