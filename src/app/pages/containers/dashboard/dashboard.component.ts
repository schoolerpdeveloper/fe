import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { stepper,slider } from 'src/app/utility/router.animation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  animations: [
    // stepper,
    slider,
    // transformer,
    
  ]
})
export class DashboardComponent {
  constructor() {}
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
