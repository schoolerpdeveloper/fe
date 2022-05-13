import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableStringFilterComponent } from './searchable-string-filter.component';

describe('SearchableStringFilterComponent', () => {
  let component: SearchableStringFilterComponent;
  let fixture: ComponentFixture<SearchableStringFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchableStringFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchableStringFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
