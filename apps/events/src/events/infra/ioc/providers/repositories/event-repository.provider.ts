import { EventRepository } from '@events/domain/repositories';
import { EventTypeormRepository } from '@events/infra/database/repositories/event-typeorm.repository';
import { EventTypeormMapper } from '@events/infra/database/repositories/mapper/event-typeorm.mapper';
import { EventProvider } from '@events/infra/ioc/event-provider';
import { Provider } from '@nestjs/common';
import { EventTypeormModel } from '@shared/infra/database/models';
import { SharedProvider } from '@shared/infra/ioc/shared-provider';
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
      inject: [SharedProvider.DATABASE_CONNECTION],
    };
  }
}
