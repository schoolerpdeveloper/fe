import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBasedTransportCardComponent } from './student-based-transport-card.component';

describe('StudentBasedTransportCardComponent', () => {
  let component: StudentBasedTransportCardComponent;
  let fixture: ComponentFixture<StudentBasedTransportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBasedTransportCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBasedTransportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
