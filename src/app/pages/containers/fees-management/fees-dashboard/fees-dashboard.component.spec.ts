import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesManagementDashboardComponent } from './fees-dashboard.component';

describe('FeesManagementDashboardComponent', () => {
  let component: FeesManagementDashboardComponent;
  let fixture: ComponentFixture<FeesManagementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesManagementDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
