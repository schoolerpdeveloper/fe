import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassWiseFeesReportsComponent } from './class-fees-report.component';

describe('ClassWiseFeesReportsComponent', () => {
  let component: ClassWiseFeesReportsComponent;
  let fixture: ComponentFixture<ClassWiseFeesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassWiseFeesReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassWiseFeesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
