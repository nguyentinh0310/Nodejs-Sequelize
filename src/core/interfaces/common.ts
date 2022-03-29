export interface PaginationParams {
  page: number,
  limit: number,
  totalRows: number,
}

export interface ListResponse<T> {
  data: T[];
  totalRows: number,
}
