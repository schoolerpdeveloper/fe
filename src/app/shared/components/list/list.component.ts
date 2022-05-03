import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { listConfigKeys, listInitSubData } from '@shared/models/list-widget-details/list-info-details';
import { ListConfig } from '@shared/models/list-widget-details/listConfig.interface';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  cardData!: ListConfig;
  cardDataKey = [...listConfigKeys];
  searchvalue: any='';

  @Input() set listConf(value: any) {
     this.cardData = this.quickCardDataInitUpdateHelper(value);
  }
  @Input() data: any;

  @Input() set searchTermValue(value:any){
    this.searchvalue = value
  }

  selecedData = new Set();

  @Output() selected = new EventEmitter();

  constructor() {
    this.cardData = this.quickCardDataInitUpdateHelper();
  }

  ngOnInit(): void {
    () => {};
  }

  selectedData(data: any) {
    this.selecedData.clear();
    this.selecedData.add(data);
    this.selected.emit({ selected: data });
  }

  quickCardDataInitUpdateHelper(value?: any) {
    let cardData: any = {};
    this.cardDataKey.map((item: string) =>
      value
        ? (cardData[item] = { ...listInitSubData, ...value[item] })
        : (cardData[item] = { ...listInitSubData })
    );
    return cardData;
  }
}
