import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBasedParentCardComponent } from './student-based-parent-card.component';

describe('StudentBasedParentCardComponent', () => {
  let component: StudentBasedParentCardComponent;
  let fixture: ComponentFixture<StudentBasedParentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBasedParentCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBasedParentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
