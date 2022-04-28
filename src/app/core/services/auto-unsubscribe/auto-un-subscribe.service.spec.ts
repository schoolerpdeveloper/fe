import { TestBed } from '@angular/core/testing';
import { AutoUnSubscribeService } from './auto-un-subscribe.service';


describe('AutoUnSubscribeService', () => {
  let service: AutoUnSubscribeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoUnSubscribeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
