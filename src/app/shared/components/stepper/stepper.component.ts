import { trigger, state, style, transition, animate,AnimationEvent } from '@angular/animations';
import { CdkStepper, StepContentPositionState } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
  animations: [trigger('stepTransition', [
    state('previous', style({transform: 'translate3d(-100%, 0, 0)', opacity: 0})),
    state('current', style({transform: 'translate3d(0, 0, 0)', opacity: 1})),
    state('next', style({transform: 'translate3d(100%, 0, 0)', opacity: 0})),
    transition('* => *', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
  ])],
})
export class StepperComponent extends CdkStepper{
  @Input()
  activeClass = 'active';
  
  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }
  ngOnInit(): void {
      this.orientation = 'vertical';
setTimeout(() => {
  
  this._steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
    // console.log('state has changed');
    this._stateChanged();
  });

  this._animationDone.pipe(
    // This needs a `distinctUntilChanged` in order to avoid emitting the same event twice due
    // to a bug in animations where the `.done` callback gets invoked twice on some browsers.
    // See https://github.com/angular/angular/issues/24084
    distinctUntilChanged((x:any, y:any) => {
    
      return x.fromState === y.fromState && x.toState === y.toState;
    }),
    takeUntil(this._destroyed)
  ).subscribe(event => {
    // console.log(event);
    if ((event.toState as StepContentPositionState) === 'current') {
      // console.log('event.toState',event.toState);
      this.animationDone.emit();
    }
  });
}, 1500);
  }
  @Output() readonly animationDone: EventEmitter<void> = new EventEmitter<void>();

  _animationDone = new Subject<AnimationEvent>();
 
}
