import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesReportTableComponent } from './student-fees-report.component';

describe('FeesReportTableComponent', () => {
  let component: FeesReportTableComponent;
  let fixture: ComponentFixture<FeesReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesReportTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
