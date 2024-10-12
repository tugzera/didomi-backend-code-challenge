import { NotificationTypeRepository } from '@account/domain/repositories';
import { NotificationTypeTypeormRepository } from '@account/infra/database/repositories';
import { NotificationTypeTypeormMapper } from '@account/infra/database/repositories/mapper/notification-type-typeorm.mapper';
import { AccountProvider } from '@account/infra/ioc/account-provider';
import { NotificationTypeTypeormModel } from '@common/infra/database/models';
import { CommonProvider } from '@common/infra/ioc/common.provider';
import { Provider } from '@nestjs/common';

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
