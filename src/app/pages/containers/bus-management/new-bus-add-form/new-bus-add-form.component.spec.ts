import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusAddFormComponent } from './new-bus-add-form.component';

describe('NewBusAddFormComponent', () => {
  let component: NewBusAddFormComponent;
  let fixture: ComponentFixture<NewBusAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBusAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBusAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
