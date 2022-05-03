// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
// import { LocalstorageService } from '@shared/services/localstorage.service';
// import { AutoUnsubscribe } from '@utils/auto-unsubscribe.service';
// import { ListConfig } from '@utils/interfaces/listConfig.interface';
// import { initPage, Page } from '@utils/interfaces/page.meta';
// import { IStudentDetails } from '@utils/interfaces/studentData';
// import { IStudentSearchModel } from '@utils/interfaces/studentSearch.interface';
// import {
//   Observable,
//   startWith,
//   map,
//   BehaviorSubject,
//   take,
//   debounceTime,
//   takeUntil,
//   Subject,
//   filter,
//   concatMap,
//   retry,
//   of,
//   tap,
//   EMPTY,
//   takeWhile,
//   expand,
//   range,
//   shareReplay,
// } from 'rxjs';
// import {
//   StudentDetailsCoreLogicFacade,
//   IStudentDetailsCoreLogicFacade,
// } from 'src/app/container/studentdetails/class/studentDetails.core.logic';
// import { StudentapiService } from 'src/app/container/studentdetails/services/studentapi.service';
// import { StudentFacadeService } from 'src/app/container/studentdetails/services/students.facade.service';
// // import { StudentDetailsFacade } from 'src/app/container/studentdetails/services/students.facade_bck';
// import {
//   studentList,
//   studentListSearch,
// } from 'src/app/container/studentdetails/util/student.util';

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { ListConfig } from '@shared/models/list-widget-details/listConfig.interface';
import { studentListSearch } from '@shared/models/studentDetails/student-list.config';
import { Observable, tap, debounceTime, takeUntil, of } from 'rxjs';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.scss'],
  providers: [AutoUnSubscribeService],
})
export class StudentSearchComponent {
  listconfig: ListConfig = studentListSearch;

  myControl = new FormControl();

  _studentDetails: any = {};

  @Input() set ngSelectData(value: any) {
    this._studentDetails = value.length ? value : [];
  }
  _searchDisabled: boolean = false;
  @Input() set searchDisabled(value: boolean) {
    value
      ? this.myControl.disable({ onlySelf: true })
      : this.myControl.enable({ onlySelf: true });
    this._searchDisabled = value;
  }

  @Output() selectedValueEvent = new EventEmitter();
  constructor(private destroy$: AutoUnSubscribeService) {}

  ngOnInit() {}

  public loadNextSetOfRecords() {}

  captureSelected($event:any){
    console.log($event)
    this.selectedValueEvent.emit($event)
  }
}
