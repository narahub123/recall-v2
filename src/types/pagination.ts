export interface PaginationMeta {
  page: number;

  limit: number;

  total: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;
}

export interface PaginatedResult<T> {
  items: T[];

  pagination: PaginationMeta;
}

export interface ListQuery<TFilter = undefined> {
  page: number;

  limit: number;

  filter?: TFilter;

  search?: string;
}
