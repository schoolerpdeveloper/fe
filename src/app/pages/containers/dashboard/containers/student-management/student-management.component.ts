import { Component } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormControl } from '@angular/forms';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { initPaginator, IPaginator } from '@shared/models/paginator.model';
import { Store } from '@ngrx/store';
import {
  loadStudentList,
  updateStudentDetails,
} from 'src/app/pages/pages_store/actions/student.actions';
import {
  
  selectStudentLists,
  studentDataLoading,
} from 'src/app/pages/pages_store/selectors/student.selectors';
import { IStudentList } from '@shared/models/studentDetails/student-details.interface';
import {
  MatDialog,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { ConfiguredModalComponent } from '../../components/configured-modal/configured-modal.component';
import { mapfeesCalcAndClasses } from 'src/app/utility/utility';
import { TransportActions } from 'src/app/pages/pages_store/actions/transport.actions';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterEnum } from 'src/app/enums/router.enum';
import { query } from '@angular/animations';
import { TransportSelector } from 'src/app/pages/pages_store/selectors/transport.selector';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.scss'],

  providers: [
    AutoUnSubscribeService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
})
export class StudentManagementComponent {
  search = new FormControl('');
  startIndex = 0;
  endIndex = 10;
  initPaginator: IPaginator = { ...initPaginator, ...{ pageSize: 10 } };
  currentViewAs: string = 'grid';
  grids: IStudentList[] = [];
  paginated!: IPaginator;
  classes: string[] = [];
  feeses: string[] = [];
  filteredClasses: string[] = [];
  filteredFees: string[] = [];
  filteredName: string = '';
  isLoading: boolean = true;
  routeDetails = {};
  modalWindowFlag:boolean = false;
  constructor(
    private destroy$: AutoUnSubscribeService,
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  paginate(len:number){
    // if(len !== this.initPaginator.totalItems){
      return {...this.initPaginator,...len && {totalItems:len}}
    // }
    // return this.initPaginator
  }

  ngOnInit() {
 
    this.store
      .select(studentDataLoading)
      .pipe(
        takeUntil(this.destroy$),
        tap((d: boolean) => (this.isLoading = d)))
      .subscribe();
    this.search.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(200),
        distinctUntilChanged(),
        tap((d: string) => (this.filteredName = d))
      )
      .subscribe();
    this.store.select(TransportSelector.selectBusRouteCodeDetails).pipe(
      tap(d=>{
        this.routeDetails = d[0];
      }),
      filter(d=>this.modalWindowFlag)
    ).subscribe(d=>{
      this.dialog.open(ConfiguredModalComponent, {
        width: '500px',
        data: {
          modalTitle: 'Transport Details',
          data: this.routeDetails,
          loadForms: false,
          loadTable:true
        },
      });
      this.modalWindowFlag = false;
    })
    this.store
      .select(selectStudentLists)
      .pipe(
        takeUntil(this.destroy$),
        map((item: IStudentList[]) => item.map(mapfeesCalcAndClasses)),
        tap((d: any) =>
          d.forEach((i: any) => {
            if (i?.FEES_STATUS) this.feeses.push(i.FEES_STATUS);
            if (i?.CLASS_NAME) this.classes.push(i.CLASS_NAME);
          })
        )
      )
      .subscribe((d: any) => {
        this.grids = [];
        this.initPaginator = { ...this.initPaginator, totalItems: d.length };
        if (d?.length) {
          this.classes = Array.from(new Set(this.classes));
          this.feeses = Array.from(new Set(this.feeses));
          this.grids = [...d];
        }
      });

    this.store.dispatch(loadStudentList());
  }
  selectedVal(e: any, str: 'fees' | 'class') {
    if (str === 'fees') this.filteredFees = [...e];
    if (str === 'class') this.filteredClasses = [...e];
  }
  viewAs(str: string) {
    this.currentViewAs = str;
  }
  paginatedEventCapture(e: any) {
    this.paginated = e;
    this.startIndex = e?.startIndex;
    this.endIndex = e?.endIndex;
  }

  routeConfigurationCaptured(event: any) {
    if (event.routeTo === 'student_view' && event.studentDetails.ADMN_NO)
      this.router.navigate([
        RouterEnum.CONTAINER,
        RouterEnum.DASHBOARD,
        RouterEnum.STUDENT_MANAGEMENT,
        event.studentDetails.ADMN_NO,
      ]);
  }

  openModalWindowCapture(event: any) {
    this.store.dispatch(
      TransportActions.loadBusRouteId({ busRouteCode: event.busRoutecode })
    );
    this.modalWindowFlag = true
    //const dialogRef = 
  }
  studentDisableEventCapture(event: any) {
    this.store.dispatch(
      updateStudentDetails({
        data: { IS_ACTIVE: event.status, ADMN_NO: event.id },
      })
    );
  }
  loadData() {
    this.store.dispatch(loadStudentList());
  }
  newAdmission(){
    this.router.navigate([
      RouterEnum.CONTAINER,
      RouterEnum.DASHBOARD,
      RouterEnum.STUDENTADMISSION,
      'new'
    ],{
    })
  }
}
