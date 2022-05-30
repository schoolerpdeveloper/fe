import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dynamic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Output() tabBtnEvent: EventEmitter<string> = new EventEmitter<string>();
  @Input() data: any [] = [];
  @Input() columns: any[] = [];
  constructor() {}

  // columns = ['product', 'description', 'recievedOn', ''];
  btnEventTrigger(val: any, idx: any) {
    this.tabBtnEvent.emit({ id: idx, ...val });
  }
  setHeader(title: any, index: any) {
    if (!title) return 'Action';
    return title;
  }

  setData(data: any, title: any, cls: any) {
    if (!title) {
      // const newNode = document.createElement('button');
      // newNode.setAttribute('id',cls+'_id');
      // newNode.className = 'btn btn-danger btn-sm';
      // newNode.innerHTML = `Remove`;
      // let elem = document.getElementById(cls);
      // let isExistElement = document.getElementById(cls+'_id');
      // console.log(elem)
      // if(isExistElement){
      //   elem && elem.replaceChild(isExistElement,newNode);
      // }else{
      //   elem && elem.appendChild(newNode);
      // }
      return;
    }
    return data;
  }

  addClass(cls: any, idx: any, col: any) {
    if (!col) {
      return cls + idx;
    }
    return '';
  }

  ngOnInit(): void {
    // this.list_items = [
    //   {
    //     product: 'Mouse',
    //     description: 'Fast and wireless',
    //     recievedOn: new Date('2018-01-02T11:05:53.212Z'),
    //     created: new Date('2015-04-22T18:12:21.111Z'),
    //   },
    //   {
    //     product: 'Keyboard',
    //     description: 'Loud and Mechanical',
    //     recievedOn: new Date('2018-06-09T12:08:23.511Z'),
    //     created: new Date('2015-03-11T11:44:11.431Z'),
    //   },
    //   {
    //     product: 'Laser',
    //     description: "It's bright",
    //     recievedOn: new Date('2017-05-22T18:25:43.511Z'),
    //     created: new Date('2015-04-21T17:15:23.111Z'),
    //   },
    //   {
    //     product: 'Baby food',
    //     description: "It's good for you",
    //     recievedOn: new Date('2017-08-26T18:25:43.511Z'),
    //     created: new Date('2016-01-01T01:25:13.055Z'),
    //   },
    //   {
    //     product: 'Coffee',
    //     description: 'Prepared from roasted coffee beans',
    //     recievedOn: new Date('2015-04-16T23:52:23.565Z'),
    //     created: new Date('2016-12-21T21:05:03.253Z'),
    //   },
    //   {
    //     product: 'Cheese',
    //     description: 'A dairy product',
    //     recievedOn: new Date('2017-11-06T21:22:53.542Z'),
    //     created: new Date('2014-02-11T11:34:12.442Z'),
    //   },
    // ];
    // this.keys = Object.keys(this.list_items[0]); // Get the column names
  }
}
