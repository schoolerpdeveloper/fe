import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpDropdownComponent } from './erp-dropdown.component';

describe('ErpDropdownComponent', () => {
  let component: ErpDropdownComponent;
  let fixture: ComponentFixture<ErpDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErpDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErpDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
