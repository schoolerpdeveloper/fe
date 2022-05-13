import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-string-only-filter',
  templateUrl: './searchable-string-filter.component.html',
  styleUrls: ['./searchable-string-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchableStringFilterComponent implements OnInit {
  showButton: boolean = true;
  selectedItem: string[] = [];
  @Input() buttonText: string = 'Filter Items';
  @Input() stringsInput: string[] = [];
  @Output() selectedValues = new EventEmitter<string[]>();

  constructor() {}

  ngOnInit(): void {}
  test() {}
  toggleSelect(e: any) {
    this.showButton = this.selectedItem.length <= 0 ? true : false;
    let filteredStrings = this.selectedItem.map(
      (i: any) => i['$ngOptionLabel']
    );
    this.selectedValues.emit(filteredStrings);
  }
  showNgSelect() {
    this.showButton = false;
  }
}
