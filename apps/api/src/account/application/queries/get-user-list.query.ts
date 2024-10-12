import { User } from '@account/domain/entities/user';
import { PaginationProps, PaginationResponseProps } from '@repo/shared';

export namespace GetUserListQuery {
  export interface Contract {
    execute(input: GetUserListQuery.Input): GetUserListQuery.Output;
  }
  export type Input = PaginationProps<User>;
  export type Output = Promise<PaginationResponseProps<Response>>;
  export type Response = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  export enum SortBy {
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    EMAIL = 'email',
  }
}
