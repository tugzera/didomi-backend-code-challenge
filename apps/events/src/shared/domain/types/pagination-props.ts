export type PaginationProps<T> = {
  page: number;
  pageSize: number;
  searchString?: string;
  sortBy?: keyof T;
  sortDirection?: 'ASC' | 'DESC';
};
