import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IPaginator,
  IPaginatorResponse,
  paginate_model,
} from '@shared/models/paginator.model';
import { paginate } from 'src/app/utility/utility';

@Component({
  selector: 'app-erp-paginator',
  templateUrl: './erp-paginator.component.html',
  styleUrls: ['./erp-paginator.component.scss'],
})
export class ErpPaginatorComponent implements OnInit {
  public _paginator: IPaginatorResponse = { ...paginate_model };
  _currentPage: number | any = 1;
  _endPage: number | any = 1;
  _pages: number[] = [];
  _paginate!:IPaginator;

  @Output() paginated = new EventEmitter<IPaginatorResponse>();

  @Input() set erpPaging(value: IPaginator) {
    let { totalItems, currentPage, pageSize, maxPages } = value;
    this._paginate = value;
    this._currentPage = currentPage;
    this._paginator = paginate(totalItems, currentPage, pageSize, maxPages);
    this._pages = this._paginator.pages?.length ? this._paginator.pages : [];
    this._endPage = this._paginator.endPage ? this._paginator.endPage : 1;
  }

  constructor() {}

  ngOnInit(): void {}

  prev() {
    this._currentPage = this._currentPage > 1 ? this._currentPage - 1 : 1;
    this.pageEventEmit();
  }
  next() {
    this._currentPage =
      this._currentPage <= this._endPage
        ? this._currentPage + 1
        : this._paginator?.endPage;
    this.pageEventEmit();
  }

  clickSelectedItem(item: number) {
    this._currentPage = item;
    this.pageEventEmit(); 
  }

  pageEventEmit = () => {
    this._paginator = paginate(this._paginate.totalItems, this._currentPage, this._paginate.pageSize, this._paginate.maxPages);
    this.paginated.emit(this._paginator)
  }

  
}
