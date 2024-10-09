export type PaginationProps<T = any> = {
  page: number;
  pageSize: number;
  searchString?: string;
  sortBy?: keyof T;
  sortDirection?: 'ASC' | 'DESC';
};
