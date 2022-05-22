import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { BehaviorSubject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-one-column-layout',
  templateUrl: './one-column-layout.component.html',
  styleUrls: ['./one-column-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AutoUnSubscribeService],
})
export class OneColumnLayoutComponent implements OnInit {
  sideNavToggleListner = new BehaviorSubject<boolean>(false);
  showMenuText = true;
  mode: 'side' | 'over' | 'push' = 'side';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @Input() set matsideNavToggle(value: boolean) {
    this.sideNavToggleListner.next(value);
  }

  constructor(
    private observer: BreakpointObserver,
    public destroy$: AutoUnSubscribeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    let prevMode = '';
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(
        takeUntil(this.destroy$),
        tap((d) => (prevMode = this.mode))
      )
      .subscribe((res) => {
        if (res.matches) {
          this.mode = 'over';
        } else {
          this.mode = 'side';
        }
        if (prevMode !== this.mode) this.cdr.detectChanges();
      });
  }

  ngAfterViewInit() {}
}
