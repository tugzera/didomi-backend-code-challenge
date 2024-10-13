import { NotificationTypeTypeormModel } from '@common/infra/database/models';
import { CommonProvider } from '@common/infra/ioc/common.provider';
import { Provider } from '@nestjs/common';
import { NotificationTypeRepository } from '@users/domain/repositories';
import { NotificationTypeTypeormRepository } from '@users/infra/database/repositories';
import { NotificationTypeTypeormMapper } from '@users/infra/database/repositories/mapper/notification-type-typeorm.mapper';
import { AccountProvider } from '@users/infra/ioc/account-provider';

export class NotificationTypeRepositoryProviderFactory {
  static generate(): Provider {
    return {
      provide: AccountProvider.REPOSITORIES.NOTIFICATION_TYPE_REPOSITORY,
      useFactory: (databaseConnection): NotificationTypeRepository => {
        return new NotificationTypeTypeormRepository(
          databaseConnection,
          NotificationTypeTypeormModel,
          new NotificationTypeTypeormMapper(),
        );
      },
      inject: [CommonProvider.DATABASE_CONNECTION],
    };
  }
}
