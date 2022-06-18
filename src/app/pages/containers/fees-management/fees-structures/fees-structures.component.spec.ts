import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesStructureComponent } from './fees-structures.component';

describe('FeesReportTableComponent', () => {
  let component: FeesStructureComponent;
  let fixture: ComponentFixture<FeesStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
