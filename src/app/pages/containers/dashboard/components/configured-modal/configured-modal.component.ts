import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TransportSelector } from 'src/app/pages/pages_store/selectors/transport.selector';

@Component({
  selector: 'app-configured-modal',
  templateUrl: './configured-modal.component.html',
  styleUrls: ['./configured-modal.component.scss']
})
export class ConfiguredModalComponent implements OnInit {

  routeDetails$ = this.store.select(TransportSelector.selectBusRouteCodeDetails)
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private store:Store) {
  }

  ngOnInit(): void {
  }

}
