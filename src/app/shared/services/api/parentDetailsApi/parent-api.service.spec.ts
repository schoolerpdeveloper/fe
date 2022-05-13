import { TestBed } from '@angular/core/testing';

import { ParentApiService } from './parent-api.service';

describe('ParentApiService', () => {
  let service: ParentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
