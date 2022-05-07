import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpPaginatorComponent } from './erp-paginator.component';

describe('ErpPaginatorComponent', () => {
  let component: ErpPaginatorComponent;
  let fixture: ComponentFixture<ErpPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErpPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErpPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
