import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBasedFeesCardComponent } from './student-based-fees-card.component';

describe('StudentBasedFeesCardComponent', () => {
  let component: StudentBasedFeesCardComponent;
  let fixture: ComponentFixture<StudentBasedFeesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBasedFeesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBasedFeesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
