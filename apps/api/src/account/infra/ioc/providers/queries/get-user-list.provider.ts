import { GetUserListQuery } from '@account/application/queries';
import { GetUserListTypeormQuery } from '@account/infra/database/queries/get-user-list-typeorm.query';
import { Provider } from '@nestjs/common';
import { SharedProvider } from '@shared/infra/ioc/shared-provider';
import { DataSource } from 'typeorm';
import { AccountProvider } from '../../account-provider';

export class GetUserListProviderFactory {
  static generate(): Provider {
    return {
      provide: AccountProvider.QUERIES.GET_USER_LIST,
      useFactory: (connection: DataSource): GetUserListQuery.Contract => {
        return new GetUserListTypeormQuery(connection);
      },
      inject: [SharedProvider.DATABASE_CONNECTION],
    };
  }
}
