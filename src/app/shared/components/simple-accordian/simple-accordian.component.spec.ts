import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleAccordianComponent } from './simple-accordian.component';

describe('SimpleAccordianComponent', () => {
  let component: SimpleAccordianComponent;
  let fixture: ComponentFixture<SimpleAccordianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleAccordianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
