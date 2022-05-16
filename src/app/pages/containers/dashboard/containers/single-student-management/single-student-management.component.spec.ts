import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleStudentManagementComponent } from './single-student-management.component';
import { Store, StoreModule } from '@ngrx/store';

describe('SingleStudentManagementComponent', () => {
  let component: SingleStudentManagementComponent;
  let fixture: ComponentFixture<SingleStudentManagementComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ SingleStudentManagementComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleStudentManagementComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
