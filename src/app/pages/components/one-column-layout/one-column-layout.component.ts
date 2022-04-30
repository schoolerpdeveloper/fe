import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-one-column-layout',
  templateUrl: './one-column-layout.component.html',
  styleUrls: ['./one-column-layout.component.scss'],
})
export class OneColumnLayoutComponent implements OnInit {
  sideNavToggleListner = new BehaviorSubject<boolean>(false);
  showMenuText = true;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @Input() set matsideNavToggle(value:boolean){
    this.sideNavToggleListner.next(value)
  }

  constructor() {}

  ngOnInit(): void {
  }



  
}
