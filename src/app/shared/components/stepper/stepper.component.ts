import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent,
  keyframes,
} from '@angular/animations';
import { CdkStepper, StepContentPositionState } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
   //animate('1500ms cubic-bezier(0.35, 0, 0.25, 1)')
})
export class StepperComponent extends CdkStepper {
  @Input()
  activeClass = 'active';

  rippleColor:string = 'rgba(150,217,79,0.2)'

  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }
  
}
