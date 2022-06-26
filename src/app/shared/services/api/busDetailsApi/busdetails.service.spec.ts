import { TestBed } from '@angular/core/testing';

import { BusdetailsService } from './busdetails.service';

describe('BusdetailsService', () => {
  let service: BusdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
