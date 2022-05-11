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
import { loadStudentList, updateStudentDetails } from 'src/app/pages/pages_store/actions/pages.actions';
import { selectStudentLists } from 'src/app/pages/pages_store/selectors/pages.selectors';
import { IStudentList } from '@shared/models/studentDetails/student-details.interface';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.scss'],
  providers: [AutoUnSubscribeService],
})
export class StudentManagementComponent {
  search = new FormControl('');
  startIndex =0;
  endIndex = 10;
  initPaginator: IPaginator = { ...initPaginator };
  currentViewAs: string = 'grid';
  grids: IStudentList[] = [];
  paginated!: IPaginator;

  constructor(private destroy$: AutoUnSubscribeService, private store: Store) {}

  ngOnInit() {
    this.search.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(200), distinctUntilChanged())
      .subscribe((d) => {
      });


    this.store
      .select(selectStudentLists)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.initPaginator = { ...this.initPaginator, totalItems: d.length };
        this.grids = d.length ? [...d] : [];
      });

      this.store.dispatch(loadStudentList());
  }
  viewAs(str: string) {
    this.currentViewAs = str;
  }
  paginatedEventCapture(e:any){
    this.paginated = e;
    this.startIndex = e?.startIndex;
    this.endIndex = e?.endIndex;

  }
  studentDisableEventCapture(event: any) {
    this.store.dispatch(
      updateStudentDetails({
        data: { IS_ACTIVE: event.status, ADMN_NO: event.id },
      })
    );
  }
}
