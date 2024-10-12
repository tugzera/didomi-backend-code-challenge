import { EventTypeormModel } from '@common/infra/database/models';
import { CommonProvider } from '@common/infra/ioc/common.provider';
import { EventRepository } from '@events/domain/repositories';
import { EventTypeormRepository } from '@events/infra/database/repositories/event-typeorm.repository';
import { EventTypeormMapper } from '@events/infra/database/repositories/mapper/event-typeorm.mapper';
import { EventProvider } from '@events/infra/ioc/event-provider';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

export class EventRepositoryProviderFactory {
  static generate(): Provider {
    return {
      provide: EventProvider.REPOSITORIES.EVENT_REPOSITORY,
      useFactory: (connection: DataSource): EventRepository => {
        return new EventTypeormRepository(
          connection,
          EventTypeormModel,
          new EventTypeormMapper(),
        );
      },
      inject: [CommonProvider.DATABASE_CONNECTION],
    };
  }
}
