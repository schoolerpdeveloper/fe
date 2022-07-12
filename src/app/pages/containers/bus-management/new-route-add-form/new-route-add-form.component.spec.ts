import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRouteAddFormComponent } from './new-route-add-form.component';

describe('NewRouteAddFormComponent', () => {
  let component: NewRouteAddFormComponent;
  let fixture: ComponentFixture<NewRouteAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRouteAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRouteAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
