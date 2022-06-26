import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusAddFormComponent } from './bus-add-form.component';

describe('BusAddFormComponent', () => {
  let component: BusAddFormComponent;
  let fixture: ComponentFixture<BusAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
