import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguredModalComponent } from './configured-modal.component';

describe('ConfiguredModalComponent', () => {
  let component: ConfiguredModalComponent;
  let fixture: ComponentFixture<ConfiguredModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguredModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguredModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
