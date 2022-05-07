import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListCardComponent } from './student-list-card.component';

describe('StudentListCardComponent', () => {
  let component: StudentListCardComponent;
  let fixture: ComponentFixture<StudentListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
