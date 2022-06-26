import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusManagementDashboardComponent } from './bus-dashboard.component';

describe('BusManagementDashboardComponent', () => {
  let component: BusManagementDashboardComponent;
  let fixture: ComponentFixture<BusManagementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusManagementDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
