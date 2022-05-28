import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import {
  IParentDetailsAddress,
  parentDetailsAddressModel,
} from '@shared/models/parentDetailsAdress';
import { debounceTime, startWith, takeUntil } from 'rxjs';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  viewProviders: [AutoUnSubscribeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent implements OnInit {
  parentAddressForm!: FormGroup;
  parentAddressModel: IParentDetailsAddress;
  @Output() addressFormStatus = new EventEmitter<{
    [key: string]: any;
  }>();
  @Input() set addressDetails(value: IParentDetailsAddress) {
    this.parentAddressModel = value ? { ...value } : this.parentAddressModel;
  }
  constructor(
    private fb: FormBuilder,
    @Self() private destroy$: AutoUnSubscribeService
  ) {
    this.parentAddressModel = { ...parentDetailsAddressModel };
  }

  ngOnInit(): void {
    this.initParentAddressForm();
    this.parentAddressForm.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        console.log(data,this.parentAddressModel)
        let temp = {
          addressForm: {
            data:{...this.parentAddressModel,...data},
            valid: this.parentAddressForm.valid,
          },
        };
        this.addressFormStatus.emit(temp);
      });
  }

  initParentAddressForm() {
    let parentAddr = { ...this.parentAddressModel };
    this.parentAddressForm = this.fb.group({
      ADMN_NO: [parentAddr.ADMN_NO, []],
      PRNT_ADRS_CD: [parentAddr.PRNT_ADRS_CD, []],
      PRNT_ADRS_ADD1: [parentAddr.PRNT_ADRS_ADD1, []],
      PRNT_ADRS_ADD2: [parentAddr.PRNT_ADRS_ADD2, []],
      PRNT_ADRS_ADD3: [parentAddr.PRNT_ADRS_ADD3, []],
      PRNT_ADRS_ADD4: [parentAddr.PRNT_ADRS_ADD4, []],
      PRNT_ADRS_ADD5: [parentAddr.PRNT_ADRS_ADD5, []],
      PRNT_ADRS_DIST: [parentAddr.PRNT_ADRS_DIST, []],
      PRNT_ADRS_PSTL_CD: [parentAddr.PRNT_ADRS_PSTL_CD, [Validators.required]],
    });
  }
  //parentAddressFormStatusHandle
}
