import { PaginationResponseProps } from '@shared/domain/types';

export class PaginationHelper {
  static makePagination<T>(props: {
    page: number;
    pageSize: number;
    items: T[];
    count: number;
  }): PaginationResponseProps<T> {
    return {
      totalItems: props.count,
      items: props.items,
      page: props.page,
      pageSize: props.pageSize,
      totalPages: Math.ceil(props.count / props.pageSize),
    };
  }
}
