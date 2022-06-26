import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadFeesReportComponent } from './download-fees-report.component';

describe('DownloadFeesReportComponent', () => {
  let component: DownloadFeesReportComponent;
  let fixture: ComponentFixture<DownloadFeesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadFeesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadFeesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
