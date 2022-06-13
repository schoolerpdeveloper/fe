import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IModalWindowConf } from '@shared/models/modal.win.interface';
import { ParentActions } from 'src/app/pages/pages_store/actions/parent.actions';

import { TransportSelector } from 'src/app/pages/pages_store/selectors/transport.selector';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-configured-modal',
  templateUrl: './configured-modal.component.html',
  styleUrls: ['./configured-modal.component.scss'],
  animations: [
    trigger('collapsibleAnimation', [
      transition(':enter', [animate(700)]),
      transition(':leave', [
        animate(300, style({ background: 'transparent' })),
      ]),
      state('*', style({ background: 'transparent' })),
    ]),
  ],
})
export class ConfiguredModalComponent implements OnInit {
  loadMore: boolean = false;

  get submitButton(): boolean {
    return (
      this.data?.formType === 'parent' ||
      this.data?.formType === 'sibiling' ||
      this.data?.formType === 'student'
    );
  }

  @Output() addressFormStatus = new EventEmitter<{
    [key: string]: any;
  }>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private store: Store) {
    console.log(this.data);
  }

  ngOnInit(): void {}

  parentDetailsFormStatusHandle(e: any) {
    this.data.data = e.parentDetails.data;
  }
  parentAddressFormStatusHandle(e: any) {
    this.data.data.address_details = {
      ...e.addressForm.data,
      ADMN_NO: this.data.data.ADMN_NO,
      PRNT_ADRS_CD: this.data.data.PRNT_CD,
    };
  }
  sibDetailsFormStatusHandle(e: any) {
    // this
    this.data.data = e.sibilingDetails.data;
  }
  studentDetailsFormStatusHandle(e: any) {
    this.data.data = e.studentDetail.data;
  }
}
