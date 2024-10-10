import { Event } from '@events/domain/entities';
import { EventRepository } from '@events/domain/repositories';
import { EventTypeormModel } from '@shared/infra/database/models';
import { BaseTypeormRepository } from '@shared/infra/database/repositories/base-typeorm.repository';

export class EventTypeormRepository
  extends BaseTypeormRepository<EventTypeormModel, Event>
  implements EventRepository {}
