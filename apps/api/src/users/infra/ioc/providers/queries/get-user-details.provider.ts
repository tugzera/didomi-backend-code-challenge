import { CommonProvider } from '@common/infra/ioc/common.provider';
import { Provider } from '@nestjs/common';
import { GetUserDetailsQuery } from '@users/application/queries';
import { GetUserDetailsTypeormQuery } from '@users/infra/database/queries/get-user-details-typeorm.query';
import { AccountProvider } from '@users/infra/ioc/account-provider';
import { DataSource } from 'typeorm';

export class GetUserDetailsQueryProviderFactory {
  static generate(): Provider {
    return {
      provide: AccountProvider.QUERIES.GET_USER_DETAILS,
      useFactory: (connection: DataSource): GetUserDetailsQuery.Contract => {
        return new GetUserDetailsTypeormQuery(connection);
      },
      inject: [CommonProvider.DATABASE_CONNECTION],
    };
  }
}
