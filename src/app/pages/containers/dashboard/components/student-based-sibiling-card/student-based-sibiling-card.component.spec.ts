import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBasedSibilingCardComponent } from './student-based-sibiling-card.component';

describe('StudentBasedSibilingCardComponent', () => {
  let component: StudentBasedSibilingCardComponent;
  let fixture: ComponentFixture<StudentBasedSibilingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBasedSibilingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBasedSibilingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
