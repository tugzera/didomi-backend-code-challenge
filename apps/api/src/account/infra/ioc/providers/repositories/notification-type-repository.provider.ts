import { NotificationTypeRepository } from '@account/domain/repositories';
import { NotificationTypeTypeormRepository } from '@account/infra/database/repositories';
import { NotificationTypeTypeormMapper } from '@account/infra/database/repositories/mapper/notification-type-typeorm.mapper';
import { Provider } from '@nestjs/common';
import { NotificationTypeTypeormModel } from '@shared/infra/database/models';
import { SharedProvider } from '@shared/infra/ioc/shared-provider';
import { DataSource } from 'typeorm';
import { AccountProvider } from '../../account-provider';

export class NotificationTypeRepositoryProviderFactory {
  static generate(): Provider {
    return {
      provide: AccountProvider.REPOSITORIES.NOTIFICATION_TYPE_REPOSITORY,
      useFactory: (
        databaseConnection: DataSource,
      ): NotificationTypeRepository => {
        return new NotificationTypeTypeormRepository(
          databaseConnection,
          NotificationTypeTypeormModel,
          new NotificationTypeTypeormMapper(),
        );
      },
      inject: [SharedProvider.DATABASE_CONNECTION],
    };
  }
}
