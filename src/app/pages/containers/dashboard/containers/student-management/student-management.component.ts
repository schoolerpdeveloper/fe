import { Component } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  map,
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
import { selectStudentLists } from 'src/app/pages/pages_store/selectors/student.selectors';
import { IStudentList } from '@shared/models/studentDetails/student-details.interface';
import {
  MatDialog,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { ConfiguredModalComponent } from '../../components/configured-modal/configured-modal.component';
import { mapfeesCalcAndClasses } from 'src/app/utility/utility';
import { TransportActions } from 'src/app/pages/pages_store/actions/transport.actions';

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
  constructor(
    private destroy$: AutoUnSubscribeService,
    private store: Store,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.search.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(200),
        distinctUntilChanged(),
        tap((d: string) => (this.filteredName = d))
      )
      .subscribe();

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
          this.grids = [...d];
          this.classes = Array.from(new Set(this.classes));
          this.feeses = Array.from(new Set(this.feeses));
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
    console.log(event);
  }

  openModalWindowCapture(event: any) {
    const dialogRef = this.dialog.open(ConfiguredModalComponent, {
      width: '520px',
      data: {
        modalTitle:'Transport Details',
        studentDetails:event.studentDetails
      },
    });
    this.store.dispatch(TransportActions.loadBusRouteId({ busRouteCode: event.busRoutecode }));
    
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  studentDisableEventCapture(event: any) {
    this.store.dispatch(
      updateStudentDetails({
        data: { IS_ACTIVE: event.status, ADMN_NO: event.id },
      })
    );
  }
}
