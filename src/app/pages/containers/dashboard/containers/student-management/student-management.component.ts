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
} from 'src/app/pages/pages_store/actions/pages.actions';
import { selectStudentLists } from 'src/app/pages/pages_store/selectors/pages.selectors';
import { IStudentList } from '@shared/models/studentDetails/student-details.interface';
import {
  MatDialog,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { ConfiguredModalComponent } from '../../components/configured-modal/configured-modal.component';

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
  initPaginator: IPaginator = { ...initPaginator };
  currentViewAs: string = 'grid';
  grids: IStudentList[] = [];
  paginated!: IPaginator;
  classes: string[] = [];
  feeses: string[] = [];
  filteredClasses:string[]=[]
  filteredFees:string[]=[];
  filteredName:string='';
  constructor(
    private destroy$: AutoUnSubscribeService,
    private store: Store,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.search.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(200), distinctUntilChanged())
      .subscribe((d) => {
        this.filteredName = d;
      });

    this.store
      .select(selectStudentLists)
      .pipe(
        takeUntil(this.destroy$),
        map((item: IStudentList[]) =>
          item.map((d) => this.mapfeesCalcAndClasses(d))
        )
      )
      .subscribe((d) => {
        this.initPaginator = { ...this.initPaginator, totalItems: d.length };
        this.grids = d.length ? [...d] : [];
        if (d.length) {
          this.classes = Array.from(new Set(this.classes));
          this.feeses = Array.from(new Set(this.feeses));
        }
      });

    this.store.dispatch(loadStudentList());
  }
  selectedVal(e:any,str:'fees'|'class'){
    if(str === 'fees') this.filteredFees = [...e]
    if(str === 'class') this.filteredClasses = [...e]

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
    console.log(event);
    const dialogRef = this.dialog.open(ConfiguredModalComponent, {
      width: '520px',
    });

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
  mapfeesCalcAndClasses(temp: any) {
    let value = { ...temp };
    let totalFees = value?.TOTAL_FEES_AMOUNT
      ? Number(value.TOTAL_FEES_AMOUNT)
      : 1;
    let fees_Percent = value?.FEES_PAID
      ? (value?.FEES_PAID / totalFees) * 100
      : 0;
    fees_Percent = Math.round(fees_Percent);
    let paidString = 'NOT PAID';

    if (fees_Percent > 0 && fees_Percent < 100)
      paidString = 'PAID ' + fees_Percent + '%';
    else if (fees_Percent === 100) paidString = 'FULLY PAID';

    value.FEES_STATUS = paidString;
    this.feeses.push(paidString);
    if (value?.CLASS_NAME) this.classes.push(value.CLASS_NAME);
    console.log(value);
    return value;
  }
}
