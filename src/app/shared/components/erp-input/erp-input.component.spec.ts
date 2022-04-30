import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpInputComponent } from './erp-input.component';

describe('ErpInputComponent', () => {
  let component: ErpInputComponent;
  let fixture: ComponentFixture<ErpInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErpInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErpInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
