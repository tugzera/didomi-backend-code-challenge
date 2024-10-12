import { GetUserListQuery } from '@account/application/queries';
import { GetUserListTypeormQuery } from '@account/infra/database/queries/get-user-list-typeorm.query';
import { AccountProvider } from '@account/infra/ioc/account-provider';
import { CommonProvider } from '@common/infra/ioc/common.provider';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

export class GetUserListProviderFactory {
  static generate(): Provider {
    return {
      provide: AccountProvider.QUERIES.GET_USER_LIST,
      useFactory: (connection: DataSource): GetUserListQuery.Contract => {
        return new GetUserListTypeormQuery(connection);
      },
      inject: [CommonProvider.DATABASE_CONNECTION],
    };
  }
}
