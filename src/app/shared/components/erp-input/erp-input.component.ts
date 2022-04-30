import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MaskService } from 'ngx-mask';
@Component({
  selector: 'app-erp-input',
  templateUrl: './erp-input.component.html',
  styleUrls: ['./erp-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ErpInputComponent),
    },

    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ErpInputComponent),
      multi: true,
    },
    MaskService,
  ],
})
export class ErpInputComponent implements ControlValueAccessor, Validator {
  @Input() label: string = '';
  @Input() parentForm!: FormGroup;
  @Input() fieldName!: string;
  @Input() type: 'text' | 'number' | 'tel' = 'text';
  @Input() maskedString: string = '';
  @Input() useMaskedInput: boolean = false;

  constructor(private _cdr: ChangeDetectorRef, private mask: MaskService) {}

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  ngOnInit() {
    // this.formField.valueChanges.pipe().subscribe((d) => console.log(d));
  }

  value: string = '';

  changed(value: any) {} // Called on a value change
  touched() {} // Called if you care if the form was touched
  discloseValidatorChange = () => {}; // Called on a validator change or re-validation;
  isDisabled!: boolean;

  onChange(event: Event) {
    let value: string = '';
    value = (<HTMLInputElement>event?.target)?.value
      ? (<HTMLInputElement>event?.target)?.value
      : '';
    this.changed(value);
    // this._cdr.markForCheck()
  }
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.changed = fn;
  }
  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let valid = true;
    let d = '';
    if (this.useMaskedInput) {
      d = this.mask.applyMask(control.value, this.maskedString);
      valid = d.length === this.maskedString.length ? true : false;
    }
    return valid
      ? null
      : {
          ...(d.length === 0 && { required: true }),
          ...(d.length > 0 && { maskedInput: true }),
        };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.discloseValidatorChange = fn;
  }
}
