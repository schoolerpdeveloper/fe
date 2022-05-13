import { Component } from '@angular/core';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { Store } from '@ngrx/store';
import { IStudentDetails } from '@shared/models/studentDetails';
import { takeUntil } from 'rxjs';
import { selectAllStudents } from 'src/app/pages/pages_store/selectors/student.selectors';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
  providers:[AutoUnSubscribeService]
})
export class StudentFormComponent {
  loadStudentDetails:IStudentDetails[] = [];
  constructor(private store: Store,private destroy$:AutoUnSubscribeService) {}

  ngOnInit(){
    // this.loadStudentDetails
    this.store.select(selectAllStudents).pipe(takeUntil(this.destroy$)).subscribe(d=>{
      this.loadStudentDetails = [...d];
    })
  }
}
