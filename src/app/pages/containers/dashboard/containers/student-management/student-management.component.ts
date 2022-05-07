import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormControl } from '@angular/forms';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { initPaginator } from '@shared/models/paginator.model';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.scss'],
  providers:[AutoUnSubscribeService]
})
export class StudentManagementComponent {
  search = new FormControl('');
  pages = Array(100).fill(0).map((i,ind)=>ind);
  initPaginator = {...initPaginator,...{totalItems:this.pages.length,}};
  grids:any = Array(10).fill(0)
  currentViewAs: string = 'grid';

  constructor(private destroy$:AutoUnSubscribeService){}

  ngOnInit(){
    this.search.valueChanges.pipe(takeUntil(this.destroy$),debounceTime(200),distinctUntilChanged()).subscribe(d=>{
      console.log(d)
    })
  }
  viewAs(str:string){
    this.currentViewAs = str
  }
}
