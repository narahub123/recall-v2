export interface ListQuery<TFilter = undefined, TSearch = undefined> {
  page: number;

  limit: number;

  filter?: TFilter;

  search?: TSearch;
}
