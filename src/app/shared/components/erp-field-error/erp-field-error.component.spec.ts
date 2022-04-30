import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpFieldErrorComponent } from './erp-field-error.component';

describe('ErpFieldErrorComponent', () => {
  let component: ErpFieldErrorComponent;
  let fixture: ComponentFixture<ErpFieldErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErpFieldErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErpFieldErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
