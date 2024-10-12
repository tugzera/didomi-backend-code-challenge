import { EventTypeormModel } from '@common/infra/database/models';
import { Event } from '@events/domain/entities';
import { EventRepository } from '@events/domain/repositories';
import { BaseTypeormRepository } from '@repo/shared';

export class EventTypeormRepository
  extends BaseTypeormRepository<EventTypeormModel, Event>
  implements EventRepository {}
