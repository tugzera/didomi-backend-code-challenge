import { UserTypeormModel } from '@common/infra/database/models';
import { CommonProvider } from '@common/infra/ioc/common.provider';
import { Provider } from '@nestjs/common';
import { UserRepository } from '@users/domain/repositories';
import { UserTypeormMapper } from '@users/infra/database/repositories/mapper/user-typeorm.mapper';
import { UserTypeormRepository } from '@users/infra/database/repositories/user-typeorm.repository';
import { AccountProvider } from '@users/infra/ioc/account-provider';

export class UserRepositoryProviderFactory {
  static generate(): Provider {
    return {
      provide: AccountProvider.REPOSITORIES.USER_REPOSITORY,
      useFactory: (databaseConnection): UserRepository => {
        return new UserTypeormRepository(
          databaseConnection,
          UserTypeormModel,
          new UserTypeormMapper(),
        );
      },
      inject: [CommonProvider.DATABASE_CONNECTION],
    };
  }
}
