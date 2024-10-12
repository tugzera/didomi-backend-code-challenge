export type PaginationResponseProps<T> = {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
