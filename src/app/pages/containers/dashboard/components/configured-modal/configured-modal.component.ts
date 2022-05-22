import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IModalWindowConf } from '@shared/models/modal.win.interface';

import { TransportSelector } from 'src/app/pages/pages_store/selectors/transport.selector';

@Component({
  selector: 'app-configured-modal',
  templateUrl: './configured-modal.component.html',
  styleUrls: ['./configured-modal.component.scss'],
})
export class ConfiguredModalComponent implements OnInit {
  routeDetails$ = this.store.select(
    TransportSelector.selectBusRouteCodeDetails
  );
  loader: boolean = true;
  validState: boolean = false;
  @Output() addressFormStatus = new EventEmitter<{
    [key: string]: any;
  }>();
  parentFormData:{[key:string]:any} = {}
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private store: Store) {
    console.log(data);
  }

  ngOnInit(): void {
    this.loader = Object.keys(this.data).length ? false : true;
  }

  parentDetailsFormStatusHandle(e: any) {
    this.validState = e?.parentDetails.valid && e?.parentAddress?.valid;
    console.log(e)
    this.parentFormData = {...e}
  }
  parentAddressFormStatusHandle(e: any) {
    this.validState = e?.parentDetails.valid && e?.parentAddress?.valid;
    console.log(e)
    this.parentFormData = {...e}
  }

  submit(data: IModalWindowConf) {
//     switch (data?.formType) {
//       case 'parent':
//         {
//           if (data?.action === 'add') this.createParentForm();
//           if (data?.action === 'update') this.updateParentForm();
//         }

//         break;

//       default:
//         break;
//     }
//     // if (this.validState) {
//     //   this.store.dispatch(
//     //     ParentActions.updateParentDetails({ data: e?.parentDetails?.data })
//     //   );
//     //   this.store.dispatch(
//     //     AddressActions.updateAddressDetails({ data: e?.parentDetails?.data })
//     //   );
//     // }
//   }

//   createParentForm() {}
//   updateParentForm() {
 
// console.log(this.parentFormData)

//     if (this.parentFormData?.['parentDetails']?.data) {
//       this.store.dispatch(
//       ParentActions.updateParentDetails({ data: this.parentFormData?.['parentDetails']?.data })
//       );
//     }
//     if (this.parentFormData?.['parentAddress']?.data) {
//       this.store.dispatch(
//       AddressActions.updateAddressDetails({ data: this.parentFormData?.['parentAddress']?.data })
//       );
//     }

//     if (this.parentFormData?.['parentAddress']?.data?.ID === null) {
//       this.store.dispatch(
//       AddressActions.addAddressDetails({ data: this.parentFormData?.['parentAddress']?.data })
//       );
//     }
  }
}
