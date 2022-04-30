import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-erp-field-error',
  templateUrl: './erp-field-error.component.html',
  styleUrls: ['./erp-field-error.component.scss'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class ErpFieldErrorComponent implements OnInit {
  @Input()
  public formField!: FormControl;
  constructor() { }

  ngOnInit(): void {
  }

}
