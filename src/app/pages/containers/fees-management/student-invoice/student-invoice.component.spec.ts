import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPaymentsInfoComponent } from './student-invoice.component';

describe('StudentPaymentsInfoComponent', () => {
  let component: StudentPaymentsInfoComponent;
  let fixture: ComponentFixture<StudentPaymentsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPaymentsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPaymentsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
