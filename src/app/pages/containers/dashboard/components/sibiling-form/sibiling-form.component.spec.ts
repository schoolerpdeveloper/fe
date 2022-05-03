import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SibilingFormComponent } from './sibiling-form.component';

describe('SibilingFormComponent', () => {
  let component: SibilingFormComponent;
  let fixture: ComponentFixture<SibilingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SibilingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SibilingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
