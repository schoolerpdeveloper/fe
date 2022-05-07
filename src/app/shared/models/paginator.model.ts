export interface IPaginator {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  maxPages: number;
}

export const initPaginator ={
    totalItems:10,
    currentPage:1,
    pageSize: 10,
    maxPages: 10
}

export interface IPaginatorResponse {
  totalItems?: number;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
  startPage?: number;
  endPage?: number;
  startIndex?: number;
  endIndex?: number;
  pages?: number[];
}

export const paginate_model = {
  totalItems: 0,
  currentPage: 0,
  pageSize: 0,
  totalPages: 0,
  startPage: 0,
  endPage: 0,
  startIndex: 0,
  endIndex: 0,
  pages: [],
};
