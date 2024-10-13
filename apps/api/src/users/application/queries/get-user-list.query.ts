import { PaginationProps, PaginationResponseProps } from '@repo/shared';
import { User } from '@users/domain/entities/user';

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
    consents: Consent[];
  };
  export type Consent = {
    id: string;
    enabled: boolean;
  };
  export enum SortBy {
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    EMAIL = 'email',
  }
}
