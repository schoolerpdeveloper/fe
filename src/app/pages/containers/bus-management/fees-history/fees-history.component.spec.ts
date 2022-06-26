import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesHistoryComponent } from './fees-history.component';

describe('FeesHistoryComponent', () => {
  let component: FeesHistoryComponent;
  let fixture: ComponentFixture<FeesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
