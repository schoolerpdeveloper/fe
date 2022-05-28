import { Component } from '@angular/core';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { Store } from '@ngrx/store';
import { IStudentDetails } from '@shared/models/studentDetails';
import { ITransportDeatils } from '@shared/models/transportDetails';
import { takeUntil } from 'rxjs';
import { TransportActions } from 'src/app/pages/pages_store/actions/transport.actions';
import { selectAllStudents } from 'src/app/pages/pages_store/selectors/student.selectors';
import { TransportSelector } from 'src/app/pages/pages_store/selectors/transport.selector';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
  providers: [AutoUnSubscribeService],
})
export class StudentFormComponent {
  loadStudentDetails: IStudentDetails[] = [];
  routeDetails: ITransportDeatils[] = [];
  constructor(private store: Store, private destroy$: AutoUnSubscribeService) {}

  ngOnInit() {
    // this.loadStudentDetails
    this.store
      .select(TransportSelector.selectBusRouteCodeDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.routeDetails = d;
      });

    this.store
      .select(selectAllStudents)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.loadStudentDetails = [...d];
      });

    this.store.dispatch(TransportActions.loadAllBusRoute());
  }

  selected(e: any) {
    console.log(e);
  }
  interactedStreamStepper(e: any) {
    console.log(e);
  }
}
