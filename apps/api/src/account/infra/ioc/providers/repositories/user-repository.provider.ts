import { UserRepository } from '@account/domain/repositories';
import { UserTypeormMapper } from '@account/infra/database/repositories/mapper/user-typeorm.mapper';
import { UserTypeormRepository } from '@account/infra/database/repositories/user-typeorm.repository';
import { Provider } from '@nestjs/common';
import { UserTypeormModel } from '@shared/infra/database/models';
import { SharedProvider } from '@shared/infra/ioc/shared-provider';
import { DataSource } from 'typeorm';
import { AccountProvider } from '../../account-provider';

export class UserRepositoryProviderFactory {
  static generate(): Provider {
    return {
      provide: AccountProvider.REPOSITORIES.USER_REPOSITORY,
      useFactory: (databaseConnection: DataSource): UserRepository => {
        return new UserTypeormRepository(
          databaseConnection,
          UserTypeormModel,
          new UserTypeormMapper(),
        );
      },
      inject: [SharedProvider.DATABASE_CONNECTION],
    };
  }
}
