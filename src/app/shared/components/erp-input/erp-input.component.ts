import { Component, ElementRef, forwardRef, Input, Self } from '@angular/core';
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
import { ISelectData } from '@shared/models/ISelectData';
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
  @Input() type: 'text' | 'number' | 'tel' | 'select' | 'dateTime' | 'textarea' = 'text';
  @Input() maskedString: string = '';
  @Input() useMaskedInput: boolean = false;
  public _selectData: ISelectData[] =[];
  @Input() set selectData (value: ISelectData[]){
    this._selectData = value ? value : []
  }
  @Input() defaultSelectValue: any = '';
  @Input() maskPlaceHolder: any = '-';
  @Input() prefix:string=''


  inputElement!: ElementRef;
  constructor(@Self() private mask: MaskService) {}

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  value: string = '';
 

  changed(value: any) {} // Called on a value change
  touched() {} // Called if you care if the form was touched
  discloseValidatorChange = () => {}; // Called on a validator change or re-validation;
  isDisabled!: boolean;

  onChange(event: any) {
    let value: string = '';
    value = event?.target?.value ? event.target.value : ''
    // value = (<HTMLInputElement | HTMLSelectElement>event?.target)?.value
    //   ? (<HTMLInputElement | HTMLSelectElement>event?.target)?.value
    //   : '';
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
    if (this.useMaskedInput) return this.initMaskInputValidator(control); // this will work along with if field required
    return null;
  }

  initMaskInputValidator(control: AbstractControl): ValidationErrors | null {
    const data = (): string =>
      this.mask.applyMask(control.value, this.maskedString);
      const isRequired = () => control.hasValidator(Validators.required)
      let temp = {
        ...data().length === 0 && isRequired() && {required:true},
        ...((data().length > 0) && (data().length < this.maskedString.length)) && { maskedInput:true},
      };
      console.log(temp,control.errors)

      return Object.keys(temp).length === 0 ? null : temp;
 
  }

  /**Look for validator changes */
  registerOnValidatorChange?(fn: () => void): void {
    this.discloseValidatorChange = fn;
  }
}